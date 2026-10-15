import { defaultAuthor } from "@/notifications/author";
import { clip } from "@/notifications/clip";
import { buildNotification } from "@/notifications/notification";
import type { Notification } from "@/notifications/notification";
import { toneColorHex } from "@/notifications/tone-color";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

const limits = { fallback: 300, header: 150 } as const;

interface SlackText {
  text: string;
  type: "mrkdwn" | "plain_text";
}

interface SlackBlock {
  elements?: SlackText[];
  fields?: SlackText[];
  text?: SlackText;
  type: "context" | "header" | "section";
}

/**
 * Slack incoming-webhook body.
 */
export interface SlackPayload {
  attachments: { blocks: SlackBlock[]; color: string }[];
  text: string;
}

const escape = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const link = (url: string, label: string): string =>
  `<${url}|${escape(label)}>`;

const mrkdwn = (text: string): SlackText => ({ text, type: "mrkdwn" });

const factFields = (notification: Notification): SlackText[] => {
  const fields: SlackText[] = [];
  if (notification.environment) {
    fields.push(
      mrkdwn(`*Environment*\n\`${escape(notification.environment)}\``)
    );
  }
  if (notification.branch) {
    fields.push(mrkdwn(`*Branch*\n\`${escape(notification.branch)}\``));
  }
  if (notification.commit) {
    const { commit } = notification;
    const value = commit.url
      ? link(commit.url, commit.short)
      : `\`${escape(commit.short)}\``;
    const author = commit.author ? ` · ${escape(commit.author)}` : "";
    fields.push(mrkdwn(`*Commit*\n${value}${author}`));
  }
  return fields;
};

const linkLine = (notification: Notification): string | undefined => {
  const links: string[] = [];
  if (notification.openUrl) {
    links.push(link(notification.openUrl, "Open"));
  }
  if (
    notification.inspectUrl &&
    notification.inspectUrl !== notification.openUrl
  ) {
    links.push(link(notification.inspectUrl, "Inspect"));
  }
  if (links.length === 0) {
    return undefined;
  }
  return links.join(" · ");
};

const blocks = (notification: Notification): SlackBlock[] => {
  const heading = notification.mark
    ? `${notification.mark} ${notification.title}`
    : notification.title;
  const list: SlackBlock[] = [
    {
      text: { text: clip(heading, limits.header), type: "plain_text" },
      type: "header",
    },
  ];

  if (notification.author !== defaultAuthor) {
    list.push({
      elements: [mrkdwn(`*${escape(notification.author)}*`)],
      type: "context",
    });
  }
  if (notification.subject) {
    const lines = [`*${escape(notification.subject)}*`];
    if (notification.body) {
      lines.push(escape(notification.body));
    }
    list.push({
      text: mrkdwn(lines.map((line) => `>${line}`).join("\n")),
      type: "section",
    });
  }

  const fields = factFields(notification);
  if (fields.length > 0) {
    list.push({ fields, type: "section" });
  }
  if (notification.buildError) {
    list.push({
      text: mrkdwn(
        `*Build error*\n\`\`\`${escape(notification.buildError)}\`\`\``
      ),
      type: "section",
    });
  }

  const links = linkLine(notification);
  if (links) {
    list.push({ text: mrkdwn(links), type: "section" });
  }
  list.push({
    elements: [mrkdwn(escape(notification.footer))],
    type: "context",
  });
  return list;
};

/**
 * Builds a Slack attachment that keeps the status color.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const slackPayload = (webhook: VercelWebhook): SlackPayload => {
  const notification = buildNotification(webhook);
  const fallback = clip(
    notification.subject
      ? `${notification.title}: ${notification.subject}`
      : notification.title,
    limits.fallback
  );
  return {
    attachments: [
      { blocks: blocks(notification), color: toneColorHex(notification.tone) },
    ],
    text:
      notification.author === defaultAuthor
        ? fallback
        : `${notification.author}: ${fallback}`,
  };
};
