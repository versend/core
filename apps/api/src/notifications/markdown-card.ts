import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { defaultAuthor } from "./author";
import { clip } from "./clip";
import { buildNotification } from "./notification";
import type { Notification } from "./notification";
import type { NotificationTone } from "./tone";

const titleLength = 200;

/**
 * Markdown rendering shared by destinations without a rich card format.
 */
export interface MarkdownCard {
  click?: string;
  markdown: string;
  title: string;
  tone: NotificationTone;
}

const md = (value: string): string =>
  value.replaceAll(/[\\`*_[\]<>]/gu, (character) => `\\${character}`);

const quote = (line: string): string =>
  line
    .split("\n")
    .map((entry) => `> ${entry}`)
    .join("\n");

const metaLine = (notification: Notification): string | undefined => {
  const bits: string[] = [];
  if (notification.environment) {
    bits.push(`\`${md(notification.environment)}\``);
  }
  if (notification.branch) {
    bits.push(`\`${md(notification.branch)}\``);
  }
  if (notification.commit) {
    const short = md(notification.commit.short);
    const linked = notification.commit.url
      ? `[\`${short}\`](${notification.commit.url})`
      : `\`${short}\``;
    bits.push(
      notification.commit.author
        ? `${linked} ${md(notification.commit.author)}`
        : linked
    );
  }
  if (bits.length === 0) {
    return undefined;
  }
  return bits.join(" · ");
};

const linkLine = (notification: Notification): string | undefined => {
  const links: string[] = [];
  if (notification.openUrl) {
    links.push(`[Open](${notification.openUrl})`);
  }
  if (
    notification.inspectUrl &&
    notification.inspectUrl !== notification.openUrl
  ) {
    links.push(`[Inspect](${notification.inspectUrl})`);
  }
  if (links.length === 0) {
    return undefined;
  }
  return links.join(" · ");
};

const markdownBody = (notification: Notification): string => {
  const lines: string[] = [];
  if (notification.mark) {
    lines.push(notification.mark);
  }
  if (notification.author !== defaultAuthor) {
    lines.push(`**${md(notification.author)}**`);
  }
  const meta = metaLine(notification);
  if (meta) {
    lines.push("", meta);
  }
  if (notification.subject) {
    lines.push("", quote(`**${md(notification.subject)}**`));
    if (notification.body) {
      lines.push(quote(md(notification.body)));
    }
  }
  if (notification.buildError) {
    lines.push(
      "",
      "**Build error**",
      "",
      "```",
      notification.buildError,
      "```"
    );
  }
  const links = linkLine(notification);
  if (links) {
    lines.push("", links);
  }
  lines.push("", md(notification.footer));
  return lines.join("\n").trim();
};

/**
 * Builds the markdown card for a webhook.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const markdownCard = (webhook: VercelWebhook): MarkdownCard => {
  const notification = buildNotification(webhook);
  const title = clip(
    notification.author === defaultAuthor
      ? notification.title
      : `${notification.author} · ${notification.title}`,
    titleLength
  );
  return {
    click: notification.openUrl ?? notification.inspectUrl,
    markdown: markdownBody(notification),
    title,
    tone: notification.tone,
  };
};
