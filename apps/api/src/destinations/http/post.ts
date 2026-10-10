import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";

/**
 * POSTs the webhook JSON to an HTTP destination.
 *
 * @param webhook - Verified Vercel webhook.
 * @param url - Destination URL.
 */
export const postHttp = async (
  webhook: VercelWebhook,
  url: string
): Promise<void> => {
  await sendWithRetry(() =>
    fetch(url, {
      body: JSON.stringify(webhook),
      headers: {
        "content-type": "application/json",
        "user-agent": "Versend/1.0",
        "x-versend-event": webhook.type,
      },
      method: "POST",
    })
  );
};
