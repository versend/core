import { upstashRedis, vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "zod/v4";

export const env = createEnv({
  server: {
    WEBHOOK_INTEGRATION_SECRET: string(),
    DISCORD_WEBHOOK_URL: string().url(),
    DISCORD_WEBHOOK_USERNAME: string().optional(),
    DISCORD_WEBHOOK_AVATAR_URL: string().url().optional(),
  },
  client: {},
  runtimeEnv: {
    WEBHOOK_INTEGRATION_SECRET: process.env.WEBHOOK_INTEGRATION_SECRET,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    DISCORD_WEBHOOK_USERNAME: process.env.DISCORD_WEBHOOK_USERNAME,
    DISCORD_WEBHOOK_AVATAR_URL: process.env.DISCORD_WEBHOOK_AVATAR_URL,
  },
  extends: [vercel(), upstashRedis()],
});
