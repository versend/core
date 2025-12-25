import { env } from "@/env";
import type { VercelWebhook } from "@/schemas/vercel";
import type { Provider } from "../types";
import { sendEmbed } from "./client";
import { formatWebhook } from "./formatter";

const discordProvider: Provider | null = env.DISCORD_WEBHOOK_URL
  ? {
      name: "discord",
      async send(webhook: VercelWebhook): Promise<void> {
        const embed = formatWebhook(webhook);
        await sendEmbed(embed);
      },
    }
  : null;

export default discordProvider;
