import { providers } from "@/providers/registry";
import type { VercelWebhook } from "@/schemas/vercel";

export async function sendNotifications(webhook: VercelWebhook): Promise<void> {
  await Promise.all(providers.map((provider) => provider.send(webhook)));
}
