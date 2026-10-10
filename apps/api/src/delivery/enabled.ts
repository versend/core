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
  if (present(ENV.HTTP_DESTINATION_URL)) {
    names.push("http");
  }
  return names;
};
