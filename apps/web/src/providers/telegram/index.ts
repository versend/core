import { env } from "@/env";
import type { VercelWebhook } from "@/schemas/vercel";
import type { Provider } from "../types";
import { sendMessage } from "./client";
import { formatWebhook } from "./formatter";

const telegramProvider: Provider | null =
  env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID
    ? {
        name: "telegram",
        async send(webhook: VercelWebhook): Promise<void> {
          const message = formatWebhook(webhook);
          await sendMessage(message);
        },
      }
    : null;

export default telegramProvider;
