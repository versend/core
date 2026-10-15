import { ENV } from "@/config/env";
import { present } from "@/config/present";
import type { Destination, Sender } from "@/delivery/destination";

import { postNtfy } from "./post";

/**
 * ntfy, on when `NTFY_URL` is set. `NTFY_TOKEN` is optional.
 */
export const ntfy: Destination = {
  configure: (): Sender | undefined => {
    const url = ENV.NTFY_URL;
    if (!present(url)) {
      return undefined;
    }

    const token = ENV.NTFY_TOKEN?.trim() || undefined;
    return (webhook) => postNtfy(webhook, { token, url });
  },
  name: "ntfy",
};
