import {
  BellIcon,
  HashIcon,
  MessageSquareIcon,
  SendIcon,
  SmartphoneIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import { DiscordCard } from "./discord-card";
import { GotifyCard } from "./gotify-card";
import { NtfyCard } from "./ntfy-card";
import type { EventSample } from "./samples";
import { SlackCard } from "./slack-card";
import { TelegramCard } from "./telegram-card";

/**
 * A destination tab and the card it renders.
 */
export interface PreviewDestination {
  Icon: ComponentType<{ className?: string }>;
  Card: ComponentType<{ event: EventSample }>;
  env: string;
  name: string;
}

export const discordPreview: PreviewDestination = {
  Card: DiscordCard,
  Icon: MessageSquareIcon,
  env: "DISCORD_WEBHOOK_URL",
  name: "Discord",
};

export const previewDestinations: PreviewDestination[] = [
  discordPreview,
  {
    Card: TelegramCard,
    Icon: SendIcon,
    env: "TELEGRAM_BOT_TOKEN",
    name: "Telegram",
  },
  { Card: SlackCard, Icon: HashIcon, env: "SLACK_WEBHOOK_URL", name: "Slack" },
  { Card: NtfyCard, Icon: BellIcon, env: "NTFY_URL", name: "ntfy" },
  {
    Card: GotifyCard,
    Icon: SmartphoneIcon,
    env: "GOTIFY_URL",
    name: "Gotify",
  },
];
