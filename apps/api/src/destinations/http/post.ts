import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";

export async function postHttp(
  webhook: VercelWebhook,
  url: string
): Promise<void> {
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
}
