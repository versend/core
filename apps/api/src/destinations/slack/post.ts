import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";
import { slackPayload } from "./message";

/**
 * Posts the webhook to a Slack incoming webhook.
 *
 * @param webhook - Verified Vercel webhook.
 * @param url - Incoming webhook URL.
 */
export const postSlack = async (
  webhook: VercelWebhook,
  url: string
): Promise<void> => {
  await sendWithRetry(() =>
    fetch(url, {
      body: JSON.stringify(slackPayload(webhook)),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
  );
};
