import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { deliver } from "./deliver";

/**
 * Starts delivery without waiting for it, so the webhook response is never
 * held up by a slow destination. `deliver` reports failures itself.
 *
 * @param webhook - Verified Vercel webhook.
 */
export const scheduleDelivery = (webhook: VercelWebhook): void => {
  void deliver(webhook);
};
