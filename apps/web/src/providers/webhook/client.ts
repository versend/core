import { env } from "@/env";
import type { VercelWebhook } from "@/schemas/vercel";

const RETRY_CONFIG = {
  maxRetries: 3,
  rateLimitDelay: 5000,
  backoffMultiplier: 1000,
} as const;

export async function sendWebhook(webhook: VercelWebhook): Promise<void> {
  const webhookUrl = env.WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Webhook: WEBHOOK_URL is not configured");
  }

  await sendWithRetry(webhookUrl, webhook);
}

async function sendWithRetry(
  webhookUrl: string,
  webhook: VercelWebhook,
  attempt = 0
): Promise<void> {
  if (attempt >= RETRY_CONFIG.maxRetries) {
    throw new Error("Webhook: maximum retry attempts reached");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Versend/1.0",
      "X-Versend-Event": webhook.type,
    },
    body: JSON.stringify(webhook),
  });

  if (response.ok) {
    return;
  }

  // Rate limited (429)
  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    const delay = retryAfter
      ? Number.parseInt(retryAfter, 10) * 1000
      : RETRY_CONFIG.rateLimitDelay;
    await sleep(delay);
    return sendWithRetry(webhookUrl, webhook, attempt);
  }

  // Retry on server errors
  if (response.status >= 500) {
    if (attempt === RETRY_CONFIG.maxRetries - 1) {
      throw new Error(`Webhook error: ${response.status}`);
    }
    await sleep(RETRY_CONFIG.backoffMultiplier * (attempt + 1));
    return sendWithRetry(webhookUrl, webhook, attempt + 1);
  }

  const errorText = await response.text();
  throw new Error(`Webhook error: ${errorText}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
