import { sendWithRetry } from "@/delivery/retry";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { discordEmbed } from "./embed";

/**
 * Where and as whom Discord messages are posted.
 */
export interface DiscordTarget {
  avatarUrl: string;
  url: string;
  username: string;
}

/**
 * Sends the webhook to a Discord webhook URL.
 *
 * @param webhook - Verified Vercel webhook.
 * @param target - Discord webhook and bot appearance.
 */
export const postDiscord = async (
  webhook: VercelWebhook,
  target: DiscordTarget
): Promise<void> => {
  await sendWithRetry(() =>
    fetch(target.url, {
      body: JSON.stringify({
        avatar_url: target.avatarUrl,
        embeds: [discordEmbed(webhook)],
        username: target.username,
      }),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
  );
};
