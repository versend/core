import { ENV } from "../../bootstrap/env";
import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";
import { discordAuthor } from "./appearance";
import { discordEmbed } from "./embed";

export async function postDiscord(
  webhook: VercelWebhook,
  url: string
): Promise<void> {
  const username = ENV.DISCORD_WEBHOOK_USERNAME?.trim() || "Versend";
  const avatar =
    ENV.DISCORD_WEBHOOK_AVATAR_URL?.trim() || discordAuthor.iconUrl;

  await sendWithRetry(() =>
    fetch(url, {
      body: JSON.stringify({
        avatar_url: avatar,
        embeds: [discordEmbed(webhook)],
        username,
      }),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
  );
}
