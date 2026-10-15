import { ENV } from "@/config/env";
import { present } from "@/config/present";
import type { Destination, Sender } from "@/delivery/destination";

import { postSlack } from "./post";

/**
 * Slack, on when `SLACK_WEBHOOK_URL` is set.
 */
export const slack: Destination = {
  configure: (): Sender | undefined => {
    const url = ENV.SLACK_WEBHOOK_URL;
    if (!present(url)) {
      return undefined;
    }

    return (webhook) => postSlack(webhook, { url });
  },
  name: "slack",
};
