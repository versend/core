import { ENV } from "@/config/env";
import { present } from "@/config/present";
import type { Destination, Sender } from "@/delivery/destination";

import { postGotify } from "./post";

/**
 * Gotify, on when `GOTIFY_URL` and `GOTIFY_TOKEN` are set.
 */
export const gotify: Destination = {
  configure: (): Sender | undefined => {
    const server = ENV.GOTIFY_URL;
    const token = ENV.GOTIFY_TOKEN;
    if (!(present(server) && present(token))) {
      return undefined;
    }

    return (webhook) => postGotify(webhook, { server, token: token.trim() });
  },
  name: "gotify",
};
