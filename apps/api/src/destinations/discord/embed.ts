import { clip } from "@/notifications/clip";
import type { NotificationCommit } from "@/notifications/commit";
import { buildNotification } from "@/notifications/notification";
import type { Notification } from "@/notifications/notification";
import { toneColor } from "@/notifications/tone-color";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { discordIdentity } from "./identity";

const limits = {
  code: 80,
  description: 4000,
  fence: 900,
  footer: 2048,
  name: 256,
  title: 256,
} as const;

/**
 * Discord webhook embed.
 */
export interface DiscordEmbed {
  author: { name: string; url: string; icon_url: string };
  color: number;
  description?: string;
  fields?: DiscordField[];
  footer?: { text: string; icon_url: string };
  timestamp: string;
  title: string;
  url?: string;
}

interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}

const quote = (body: string): string | undefined => {
  const lines = body
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0)
    .map((line) => `> ${line.replaceAll("*", "")}`);
  if (lines.length === 0) {
    return undefined;
  }
  return lines.join("\n");
};

const description = (notification: Notification): string | undefined => {
  if (!notification.subject) {
    return undefined;
  }

  const lines = [`**${notification.subject.replaceAll("*", "")}**`];
  const quoted = notification.body ? quote(notification.body) : undefined;
  if (quoted) {
    lines.push("", quoted);
  }
  return clip(lines.join("\n"), limits.description);
};

const commitValue = (commit: NotificationCommit): string => {
  const label = `\`${commit.short.replaceAll("`", "")}\``;
  const linked = commit.url ? `[${label}](${commit.url})` : label;
  if (!commit.author) {
    return linked;
  }
  return `${linked} · ${commit.author.replaceAll("`", "")}`;
};

const code = (value: string): string =>
  `\`${clip(value.replaceAll("`", ""), limits.code)}\``;

const fence = (value: string): string =>
  `\`\`\`\n${clip(value, limits.fence)}\n\`\`\``;

const fields = (notification: Notification): DiscordField[] => {
  const list: DiscordField[] = [];
  if (notification.environment) {
    list.push({
      inline: true,
      name: "Environment",
      value: code(notification.environment),
    });
  }
  if (notification.branch) {
    list.push({
      inline: true,
      name: "Branch",
      value: code(notification.branch),
    });
  }
  if (notification.commit) {
    list.push({
      inline: true,
      name: "Commit",
      value: commitValue(notification.commit),
    });
  }
  if (notification.buildError) {
    list.push({ name: "Build error", value: fence(notification.buildError) });
  }
  if (
    notification.inspectUrl &&
    notification.inspectUrl !== notification.openUrl
  ) {
    list.push({
      name: "Inspect",
      value: `[Open in Vercel](${notification.inspectUrl})`,
    });
  }
  return list;
};

/**
 * Builds the Discord embed for a webhook.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const discordEmbed = (webhook: VercelWebhook): DiscordEmbed => {
  const notification = buildNotification(webhook);
  const titleUrl = notification.openUrl ?? notification.inspectUrl;
  const embed: DiscordEmbed = {
    author: {
      icon_url: discordIdentity.iconUrl,
      name: clip(notification.author, limits.name),
      url: notification.authorUrl,
    },
    color: toneColor(notification.tone),
    footer: {
      icon_url: discordIdentity.iconUrl,
      text: clip(notification.footer, limits.footer),
    },
    timestamp: notification.createdAt,
    title: clip(notification.title, limits.title),
  };

  const text = description(notification);
  if (text) {
    embed.description = text;
  }
  if (titleUrl) {
    embed.url = titleUrl;
  }

  const list = fields(notification);
  if (list.length > 0) {
    embed.fields = list;
  }
  return embed;
};
