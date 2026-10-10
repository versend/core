import { ENV } from "../bootstrap/env";
import { postDiscord } from "../destinations/discord/post";
import { postHttp } from "../destinations/http/post";
import { postTelegram } from "../destinations/telegram/post";
import type { VercelWebhook } from "../vercel-webhooks/payload";
import { present } from "./enabled";

/**
 * Posts the webhook to every configured destination.
 *
 * @param webhook - Verified Vercel webhook.
 */
export const deliver = async (webhook: VercelWebhook): Promise<void> => {
  const jobs: Promise<void>[] = [];

  if (present(ENV.DISCORD_WEBHOOK_URL)) {
    jobs.push(postDiscord(webhook, ENV.DISCORD_WEBHOOK_URL));
  }
  if (present(ENV.TELEGRAM_BOT_TOKEN) && present(ENV.TELEGRAM_CHAT_ID)) {
    jobs.push(
      postTelegram(webhook, ENV.TELEGRAM_BOT_TOKEN, ENV.TELEGRAM_CHAT_ID)
    );
  }
  if (present(ENV.HTTP_DESTINATION_URL)) {
    jobs.push(postHttp(webhook, ENV.HTTP_DESTINATION_URL));
  }

  const results = await Promise.allSettled(jobs);
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    console.error(`delivery failed for ${failures.length} destination(s)`);
  }
};
