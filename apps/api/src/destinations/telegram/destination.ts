import { ENV } from "@/config/env";
import { present } from "@/config/present";
import type { Destination, Sender } from "@/delivery/destination";

import { postTelegram } from "./post";

/**
 * Telegram, on when `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set.
 */
export const telegram: Destination = {
  configure: (): Sender | undefined => {
    const token = ENV.TELEGRAM_BOT_TOKEN;
    const chatId = ENV.TELEGRAM_CHAT_ID;
    if (!(present(token) && present(chatId))) {
      return undefined;
    }

    return (webhook) => postTelegram(webhook, { chatId, token });
  },
  name: "telegram",
};
