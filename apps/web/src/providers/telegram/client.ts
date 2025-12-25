import { env } from "@/env";
import type { TelegramMessage, TelegramResponse } from "./types";

const RETRY_CONFIG = {
  maxRetries: 3,
  rateLimitDelay: 5000,
  backoffMultiplier: 1000,
} as const;

export async function sendMessage(text: string): Promise<void> {
  if (!env.TELEGRAM_CHAT_ID) {
    throw new Error("Telegram: TELEGRAM_CHAT_ID is not configured");
  }

  const message: TelegramMessage = {
    chat_id: env.TELEGRAM_CHAT_ID,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  await sendWithRetry(message);
}

async function sendWithRetry(
  message: TelegramMessage,
  attempt = 0
): Promise<void> {
  if (attempt >= RETRY_CONFIG.maxRetries) {
    throw new Error("Telegram: maximum retry attempts reached");
  }

  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  const data = (await response.json()) as TelegramResponse;

  if (data.ok) {
    return;
  }

  // Rate limited (429)
  if (data.error_code === 429) {
    await delay(RETRY_CONFIG.rateLimitDelay);
    return sendWithRetry(message, attempt);
  }

  // Retry on server errors
  if (data.error_code && data.error_code >= 500) {
    if (attempt === RETRY_CONFIG.maxRetries - 1) {
      throw new Error(`Telegram API error: ${data.description}`);
    }
    await delay(RETRY_CONFIG.backoffMultiplier * (attempt + 1));
    return sendWithRetry(message, attempt + 1);
  }

  throw new Error(`Telegram API error: ${data.description}`);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
