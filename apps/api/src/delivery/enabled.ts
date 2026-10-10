import { ENV } from "../bootstrap/env";

/**
 * Treats a blank string as unset.
 *
 * @param value - Candidate string.
 * @returns The result.
 */
export const present = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Lists destinations that have credentials configured.
 *
 * @returns The result.
 */
export const enabledDestinationNames = (): string[] => {
  const names: string[] = [];
  if (present(ENV.DISCORD_WEBHOOK_URL)) {
    names.push("discord");
  }
  if (present(ENV.TELEGRAM_BOT_TOKEN) && present(ENV.TELEGRAM_CHAT_ID)) {
    names.push("telegram");
  }
  if (present(ENV.SLACK_WEBHOOK_URL)) {
    names.push("slack");
  }
  if (present(ENV.NTFY_URL)) {
    names.push("ntfy");
  }
  if (present(ENV.GOTIFY_URL) && present(ENV.GOTIFY_TOKEN)) {
    names.push("gotify");
  }
  return names;
};
