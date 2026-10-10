import type { VercelWebhook } from "../vercel-webhooks/payload";
import { deliver } from "./run";

export function scheduleDelivery(webhook: VercelWebhook): void {
  deliver(webhook).then(
    () => undefined,
    () => undefined
  );
}
