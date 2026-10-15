import { defaultAuthor } from "@/notifications/author";
import type { NotificationCommit } from "@/notifications/commit";
import { buildNotification } from "@/notifications/notification";
import type { Notification } from "@/notifications/notification";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeAttr = (value: string): string =>
  escapeHtml(value).replaceAll('"', "&quot;");

const anchor = (url: string, label: string): string =>
  `<a href="${escapeAttr(url)}">${label}</a>`;

const heading = (notification: Notification): string => {
  const title = escapeHtml(notification.title);
  return notification.mark ? `${notification.mark} ${title}` : title;
};

const commitBit = (commit: NotificationCommit): string => {
  const short = escapeHtml(commit.short);
  return commit.url ? anchor(commit.url, short) : `<code>${short}</code>`;
};

const metaLine = (notification: Notification): string | undefined => {
  const bits: string[] = [];
  if (notification.environment) {
    bits.push(`<code>${escapeHtml(notification.environment)}</code>`);
  }
  if (notification.branch) {
    bits.push(`<code>${escapeHtml(notification.branch)}</code>`);
  }
  const { commit } = notification;
  if (commit) {
    bits.push(commitBit(commit));
  }
  if (commit?.author) {
    bits.push(escapeHtml(commit.author));
  }
  if (bits.length === 0) {
    return undefined;
  }
  return bits.join(" · ");
};

const commitQuote = (notification: Notification): string | undefined => {
  if (!notification.subject) {
    return undefined;
  }

  const subject = `<b>${escapeHtml(notification.subject)}</b>`;
  if (!notification.body) {
    return `<blockquote>${subject}</blockquote>`;
  }
  return `<blockquote>${subject}\n${escapeHtml(notification.body)}</blockquote>`;
};

const linkLine = (notification: Notification): string | undefined => {
  const links: string[] = [];
  if (notification.openUrl) {
    links.push(anchor(notification.openUrl, "Open"));
  }
  if (
    notification.inspectUrl &&
    notification.inspectUrl !== notification.openUrl
  ) {
    links.push(anchor(notification.inspectUrl, "Inspect"));
  }
  if (links.length === 0) {
    return undefined;
  }
  return links.join(" · ");
};

/**
 * Renders the webhook as a Telegram HTML message.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const telegramMessage = (webhook: VercelWebhook): string => {
  const notification = buildNotification(webhook);
  const lines = [`<b>${heading(notification)}</b>`];

  const meta = metaLine(notification);
  if (notification.author !== defaultAuthor) {
    lines.push("", `<b>${escapeHtml(notification.author)}</b>`);
    if (meta) {
      lines.push(meta);
    }
  } else if (meta) {
    lines.push("", meta);
  }

  const quote = commitQuote(notification);
  if (quote) {
    lines.push("", quote);
  }
  if (notification.buildError) {
    lines.push(
      "",
      "<b>Build error</b>",
      `<pre>${escapeHtml(notification.buildError)}</pre>`
    );
  }

  const links = linkLine(notification);
  if (links) {
    lines.push("", links);
  }

  return lines.join("\n");
};
