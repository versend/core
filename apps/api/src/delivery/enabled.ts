import { ENV } from "../bootstrap/env";

export function enabledDestinationNames(): string[] {
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
}

export function present(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
