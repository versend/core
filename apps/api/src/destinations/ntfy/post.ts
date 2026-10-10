import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";
import { deliveryCard } from "../present/card";
import type { DeliveryTone } from "../present/tone";

const priorityByTone: Record<DeliveryTone, string> = {
  failure: "urgent",
  neutral: "low",
  notice: "high",
  progress: "high",
  success: "default",
};

/**
 * Publishes the webhook to an ntfy topic.
 *
 * @param webhook - Verified Vercel webhook.
 * @param url - Topic URL.
 * @param token - Access token, when the topic is protected.
 */
export const postNtfy = async (
  webhook: VercelWebhook,
  url: string,
  token: string | undefined
): Promise<void> => {
  const card = deliveryCard(webhook);
  const accessToken = token?.trim();
  const headers = new Headers({
    Markdown: "yes",
    Priority: priorityByTone[card.tone],
    Title: card.title,
    "content-type": "text/plain; charset=utf-8",
  });
  if (card.click) {
    headers.set("Click", card.click);
  }
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  await sendWithRetry(() =>
    fetch(url, {
      body: card.markdown,
      headers,
      method: "POST",
    })
  );
};
