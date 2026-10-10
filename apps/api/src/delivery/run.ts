import { ENV } from "../bootstrap/env";
import { postDiscord } from "../destinations/discord/post";
import { postGotify } from "../destinations/gotify/post";
import { postNtfy } from "../destinations/ntfy/post";
import { postSlack } from "../destinations/slack/post";
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
  if (present(ENV.SLACK_WEBHOOK_URL)) {
    jobs.push(postSlack(webhook, ENV.SLACK_WEBHOOK_URL));
  }
  if (present(ENV.NTFY_URL)) {
    jobs.push(postNtfy(webhook, ENV.NTFY_URL, ENV.NTFY_TOKEN));
  }
  if (present(ENV.GOTIFY_URL) && present(ENV.GOTIFY_TOKEN)) {
    jobs.push(postGotify(webhook, ENV.GOTIFY_URL, ENV.GOTIFY_TOKEN));
  }

  const results = await Promise.allSettled(jobs);
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    const reasons = failures.map((result) =>
      result.reason instanceof Error ? result.reason.message : "unknown"
    );
    console.error(
      `delivery failed for ${failures.length} destination(s): ${reasons.join(", ")}`
    );
  }
};
