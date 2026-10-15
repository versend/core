import { sendWithRetry } from "@/delivery/retry";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { slackPayload } from "./message";

/**
 * Where Slack messages are posted.
 */
export interface SlackTarget {
  url: string;
}

/**
 * Posts the webhook to a Slack incoming webhook.
 *
 * @param webhook - Verified Vercel webhook.
 * @param target - Incoming webhook URL.
 */
export const postSlack = async (
  webhook: VercelWebhook,
  target: SlackTarget
): Promise<void> => {
  await sendWithRetry(() =>
    fetch(target.url, {
      body: JSON.stringify(slackPayload(webhook)),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
  );
};
