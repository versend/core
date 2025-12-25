import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "zod/v4";

export const env = createEnv({
  server: {
    WEBHOOK_INTEGRATION_SECRET: string(),
    // Discord
    DISCORD_WEBHOOK_URL: string().url().optional(),
    // Telegram
    TELEGRAM_BOT_TOKEN: string().optional(),
    TELEGRAM_CHAT_ID: string().optional(),
    // Slack
    SLACK_WEBHOOK_URL: string().url().optional(),
    // Generic Webhook
    WEBHOOK_URL: string().url().optional(),
    // Rate limiting
    UPSTASH_REDIS_REST_URL: string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: string().optional(),
    // Filtering
    FILTER_EVENTS: string().optional(),
    FILTER_TARGETS: string().optional(),
  },
  client: {},
  runtimeEnv: {
    WEBHOOK_INTEGRATION_SECRET: process.env.WEBHOOK_INTEGRATION_SECRET,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    FILTER_EVENTS: process.env.FILTER_EVENTS,
    FILTER_TARGETS: process.env.FILTER_TARGETS,
  },
  extends: [vercel()],
});
