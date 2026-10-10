import type { VercelWebhook } from "../../vercel-webhooks/payload";
import { toneColor } from "../discord/appearance";
import { deliveryFacts } from "../present/facts";
import { clip } from "../present/text";

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

const slack = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const link = (url: string, label: string): string => `<${url}|${slack(label)}>`;

const hex = (tone: Parameters<typeof toneColor>[0]): string =>
  `#${toneColor(tone).toString(16).padStart(6, "0")}`;

/**
 * Builds a Slack attachment that keeps the status color.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const slackPayload = (webhook: VercelWebhook): SlackPayload => {
  const facts = deliveryFacts(webhook);
  const heading = facts.mark ? `${facts.mark} ${facts.title}` : facts.title;
  const blocks: SlackBlock[] = [
    {
      text: { text: clip(heading, 150), type: "plain_text" },
      type: "header",
    },
  ];

  if (facts.author !== "Versend") {
    blocks.push({
      elements: [{ text: `*${slack(facts.author)}*`, type: "mrkdwn" }],
      type: "context",
    });
  }

  if (facts.subject) {
    const lines = [`*${slack(facts.subject)}*`];
    if (facts.body) {
      lines.push(slack(facts.body));
    }
    blocks.push({
      text: {
        text: lines.map((line) => `>${line}`).join("\n"),
        type: "mrkdwn",
      },
      type: "section",
    });
  }

  const fields: SlackText[] = [];
  if (facts.environment) {
    fields.push({
      text: `*Environment*\n\`${slack(facts.environment)}\``,
      type: "mrkdwn",
    });
  }
  if (facts.branch) {
    fields.push({
      text: `*Branch*\n\`${slack(facts.branch)}\``,
      type: "mrkdwn",
    });
  }
  if (facts.commit) {
    const short = slack(facts.commit.short);
    const value = facts.commit.url
      ? link(facts.commit.url, facts.commit.short)
      : `\`${short}\``;
    const author = facts.commit.author
      ? ` · ${slack(facts.commit.author)}`
      : "";
    fields.push({ text: `*Commit*\n${value}${author}`, type: "mrkdwn" });
  }
  if (fields.length > 0) {
    blocks.push({ fields, type: "section" });
  }

  if (facts.buildError) {
    blocks.push({
      text: {
        text: `*Build error*\n\`\`\`${slack(facts.buildError)}\`\`\``,
        type: "mrkdwn",
      },
      type: "section",
    });
  }

  const links: string[] = [];
  if (facts.openUrl) {
    links.push(link(facts.openUrl, "Open"));
  }
  if (facts.inspectUrl && facts.inspectUrl !== facts.openUrl) {
    links.push(link(facts.inspectUrl, "Inspect"));
  }
  if (links.length > 0) {
    blocks.push({
      text: { text: links.join(" · "), type: "mrkdwn" },
      type: "section",
    });
  }

  blocks.push({
    elements: [{ text: slack(facts.footer), type: "mrkdwn" }],
    type: "context",
  });

  const fallback = clip(
    facts.subject ? `${facts.title}: ${facts.subject}` : facts.title,
    300
  );
  return {
    attachments: [{ blocks, color: hex(facts.tone) }],
    text:
      facts.author === "Versend" ? fallback : `${facts.author}: ${fallback}`,
  };
};
