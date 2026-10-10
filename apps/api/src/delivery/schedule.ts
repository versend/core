import type { VercelWebhook } from "../vercel-webhooks/payload";
import { deliver } from "./run";

const runDelivery = async (webhook: VercelWebhook): Promise<void> => {
  try {
    await deliver(webhook);
  } catch {
    // A failed destination must not fail the webhook response.
  }
};

/**
 * Delivers the webhook without blocking the response.
 *
 * @param webhook - Verified Vercel webhook.
 */
export const scheduleDelivery = (webhook: VercelWebhook): void => {
  void runDelivery(webhook);
};
