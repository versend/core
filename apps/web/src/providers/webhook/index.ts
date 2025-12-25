import { env } from "@/env";
import type { VercelWebhook } from "@/schemas/vercel";
import type { Provider } from "../types";
import { sendWebhook } from "./client";

const webhookProvider: Provider | null = env.WEBHOOK_URL
  ? {
      name: "webhook",
      async send(webhook: VercelWebhook): Promise<void> {
        await sendWebhook(webhook);
      },
    }
  : null;

export default webhookProvider;
