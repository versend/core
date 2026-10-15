import { sendWithRetry } from "@/delivery/retry";
import { markdownCard } from "@/notifications/markdown-card";
import type { NotificationTone } from "@/notifications/tone";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

/**
 * Gotify server and application messages are pushed to.
 */
export interface GotifyTarget {
  server: string;
  token: string;
}

const priorityByTone: Record<NotificationTone, number> = {
  failure: 8,
  neutral: 2,
  notice: 5,
  progress: 5,
  success: 4,
};

const trailingSlashes = /\/+$/u;

/**
 * Pushes the webhook to a Gotify application.
 *
 * @param webhook - Verified Vercel webhook.
 * @param target - Gotify base URL and application token.
 */
export const postGotify = async (
  webhook: VercelWebhook,
  target: GotifyTarget
): Promise<void> => {
  const card = markdownCard(webhook);
  const display = { "client::display": { contentType: "text/markdown" } };
  const extras = card.click
    ? { ...display, "client::notification": { click: { url: card.click } } }
    : display;

  const endpoint = `${target.server.replace(trailingSlashes, "")}/message`;
  await sendWithRetry(() =>
    fetch(endpoint, {
      body: JSON.stringify({
        extras,
        message: card.markdown,
        priority: priorityByTone[card.tone],
        title: card.title,
      }),
      headers: {
        "content-type": "application/json",
        "x-gotify-key": target.token,
      },
      method: "POST",
    })
  );
};
