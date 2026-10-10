import type { VercelWebhook } from "../vercel-webhooks/payload";
import { deliver } from "./run";

export function readWaitUntil(
  read: () => { waitUntil: (promise: Promise<unknown>) => void }
): ((promise: Promise<unknown>) => void) | undefined {
  try {
    const execution = read();
    return execution.waitUntil.bind(execution);
  } catch {
    // Bun does not attach an ExecutionContext. Vercel does.
    return undefined;
  }
}

export function scheduleDelivery(
  waitUntil: ((promise: Promise<unknown>) => void) | undefined,
  webhook: VercelWebhook
): void {
  const job = deliver(webhook);
  if (waitUntil) {
    waitUntil(job);
    return;
  }

  job.then(
    () => undefined,
    () => undefined
  );
}
