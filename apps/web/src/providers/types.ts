import type { VercelWebhook } from "@/schemas/vercel";

export type Provider = {
  name: string;
  send(webhook: VercelWebhook): Promise<void>;
};
