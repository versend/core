import { sendWithRetry } from "@/delivery/retry";
import { markdownCard } from "@/notifications/markdown-card";
import type { NotificationTone } from "@/notifications/tone";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

/**
 * Topic ntfy messages are published to.
 */
export interface NtfyTarget {
  token?: string;
  url: string;
}

const priorityByTone: Record<NotificationTone, string> = {
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
 * @param target - Topic URL and optional access token.
 */
export const postNtfy = async (
  webhook: VercelWebhook,
  target: NtfyTarget
): Promise<void> => {
  const card = markdownCard(webhook);
  const headers = new Headers({
    Markdown: "yes",
    Priority: priorityByTone[card.tone],
    Title: card.title,
    "content-type": "text/plain; charset=utf-8",
  });
  if (card.click) {
    headers.set("Click", card.click);
  }
  if (target.token) {
    headers.set("Authorization", `Bearer ${target.token}`);
  }

  await sendWithRetry(() =>
    fetch(target.url, {
      body: card.markdown,
      headers,
      method: "POST",
    })
  );
};
