import { sendWithRetry } from "@/delivery/retry";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { telegramMessage } from "./message";

/**
 * Bot and chat Telegram messages are sent through.
 */
export interface TelegramTarget {
  chatId: string;
  token: string;
}

interface SendMessageResult {
  ok?: boolean;
  description?: string;
}

/**
 * Sends the webhook to a Telegram chat.
 *
 * @param webhook - Verified Vercel webhook.
 * @param target - Bot token and chat id.
 */
export const postTelegram = async (
  webhook: VercelWebhook,
  target: TelegramTarget
): Promise<void> => {
  const response = await sendWithRetry(() =>
    fetch(`https://api.telegram.org/bot${target.token}/sendMessage`, {
      body: JSON.stringify({
        chat_id: target.chatId,
        disable_web_page_preview: true,
        parse_mode: "HTML",
        text: telegramMessage(webhook),
      }),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
  );

  // SAFETY: sendMessage returns JSON. Only ok and description are read.
  const data = (await response.json()) as SendMessageResult;
  if (data.ok === false) {
    throw new Error(data.description ?? "telegram rejected the message");
  }
};
