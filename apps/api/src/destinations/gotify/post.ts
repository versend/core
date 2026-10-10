import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";
import { deliveryCard } from "../present/card";
import type { DeliveryTone } from "../present/tone";

const priorityByTone: Record<DeliveryTone, number> = {
  failure: 8,
  neutral: 2,
  notice: 5,
  progress: 5,
  success: 4,
};

/**
 * Pushes the webhook to a Gotify application.
 *
 * @param webhook - Verified Vercel webhook.
 * @param server - Gotify base URL.
 * @param token - Application token.
 */
export const postGotify = async (
  webhook: VercelWebhook,
  server: string,
  token: string
): Promise<void> => {
  const card = deliveryCard(webhook);
  const display = { "client::display": { contentType: "text/markdown" } };
  const extras = card.click
    ? {
        ...display,
        "client::notification": { click: { url: card.click } },
      }
    : display;

  const endpoint = `${server.replace(/\/+$/u, "")}/message`;
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
        "x-gotify-key": token.trim(),
      },
      method: "POST",
    })
  );
};
