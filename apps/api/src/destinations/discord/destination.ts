import { ENV } from "@/config/env";
import { present } from "@/config/present";
import type { Destination, Sender } from "@/delivery/destination";

import { discordIdentity } from "./identity";
import { postDiscord } from "./post";

const defaultUsername = "Versend";

/**
 * Discord, on when `DISCORD_WEBHOOK_URL` is set.
 */
export const discord: Destination = {
  configure: (): Sender | undefined => {
    const url = ENV.DISCORD_WEBHOOK_URL;
    if (!present(url)) {
      return undefined;
    }

    const target = {
      avatarUrl:
        ENV.DISCORD_WEBHOOK_AVATAR_URL?.trim() || discordIdentity.iconUrl,
      url,
      username: ENV.DISCORD_WEBHOOK_USERNAME?.trim() || defaultUsername,
    };
    return (webhook) => postDiscord(webhook, target);
  },
  name: "discord",
};
