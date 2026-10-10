import type { VercelWebhook } from "../../vercel-webhooks/payload";
import type { CommitFact, DeliveryFacts } from "../present/facts";
import { deliveryFacts } from "../present/facts";
import { clip } from "../present/text";
import { discordAuthor, toneColor } from "./appearance";

export interface DiscordEmbed {
  author: { name: string; url: string; icon_url: string };
  color: number;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: { text: string; icon_url: string };
  timestamp: string;
  title: string;
  url?: string;
}

export function discordEmbed(webhook: VercelWebhook): DiscordEmbed {
  const facts = deliveryFacts(webhook);
  const titleUrl = facts.openUrl ?? facts.inspectUrl;
  const embed: DiscordEmbed = {
    author: {
      icon_url: discordAuthor.iconUrl,
      name: clip(facts.author, 256),
      url: facts.authorUrl,
    },
    color: toneColor(facts.tone),
    footer: {
      icon_url: discordAuthor.iconUrl,
      text: clip(facts.footer, 2048),
    },
    timestamp: facts.createdAt,
    title: clip(facts.title, 256),
  };

  const description = discordDescription(facts);
  if (description) {
    embed.description = description;
  }
  if (titleUrl) {
    embed.url = titleUrl;
  }

  const fields = discordFields(facts);
  if (fields.length > 0) {
    embed.fields = fields;
  }
  return embed;
}

function discordDescription(facts: DeliveryFacts): string | undefined {
  if (!facts.subject) {
    return undefined;
  }

  const lines = [`**${facts.subject.replaceAll("*", "")}**`];
  const quoted = facts.body ? quote(facts.body) : undefined;
  if (quoted) {
    lines.push("", quoted);
  }
  return clip(lines.join("\n"), 4000);
}

function quote(body: string): string | undefined {
  const lines = body
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0)
    .map((line) => `> ${line.replaceAll("*", "")}`);
  if (lines.length === 0) {
    return undefined;
  }
  return lines.join("\n");
}

function discordFields(
  facts: DeliveryFacts
): NonNullable<DiscordEmbed["fields"]> {
  const fields: NonNullable<DiscordEmbed["fields"]> = [];
  if (facts.environment) {
    fields.push({
      inline: true,
      name: "Environment",
      value: code(facts.environment),
    });
  }
  if (facts.branch) {
    fields.push({ inline: true, name: "Branch", value: code(facts.branch) });
  }
  if (facts.commit) {
    fields.push({
      inline: true,
      name: "Commit",
      value: commitValue(facts.commit),
    });
  }
  if (facts.buildError) {
    fields.push({ name: "Build error", value: fence(facts.buildError) });
  }
  if (facts.inspectUrl && facts.inspectUrl !== facts.openUrl) {
    fields.push({
      name: "Inspect",
      value: `[Open in Vercel](${facts.inspectUrl})`,
    });
  }
  return fields;
}

function commitValue(commit: CommitFact): string {
  const label = `\`${commit.short.replaceAll("`", "")}\``;
  const linked = commit.url ? `[${label}](${commit.url})` : label;
  if (!commit.author) {
    return linked;
  }
  return `${linked} · ${commit.author.replaceAll("`", "")}`;
}

function code(value: string): string {
  return `\`${clip(value.replaceAll("`", ""), 80)}\``;
}

function fence(value: string): string {
  return `\`\`\`\n${clip(value, 900)}\n\`\`\``;
}
