import type { VercelWebhook } from "../../vercel-webhooks/payload";
import type { DeliveryFacts } from "./facts";
import { deliveryFacts } from "./facts";
import { clip } from "./text";
import type { DeliveryTone } from "./tone";

/**
 * The deployment card ntfy and Gotify publish.
 */
export interface DeliveryCard {
  click?: string;
  markdown: string;
  title: string;
  tone: DeliveryTone;
}

const md = (value: string): string =>
  value.replaceAll(/[\\`*_[\]<>]/gu, (character) => `\\${character}`);

const metaMarkdown = (facts: DeliveryFacts): string | undefined => {
  const bits: string[] = [];
  if (facts.environment) {
    bits.push(`\`${md(facts.environment)}\``);
  }
  if (facts.branch) {
    bits.push(`\`${md(facts.branch)}\``);
  }
  if (facts.commit) {
    const short = md(facts.commit.short);
    const linked = facts.commit.url
      ? `[\`${short}\`](${facts.commit.url})`
      : `\`${short}\``;
    bits.push(
      facts.commit.author ? `${linked} ${md(facts.commit.author)}` : linked
    );
  }
  if (bits.length === 0) {
    return undefined;
  }
  return bits.join(" · ");
};

const quote = (line: string): string =>
  line
    .split("\n")
    .map((entry) => `> ${entry}`)
    .join("\n");

const markdownCard = (facts: DeliveryFacts): string => {
  const lines: string[] = [];
  if (facts.mark) {
    lines.push(facts.mark);
  }
  if (facts.author !== "Versend") {
    lines.push(`**${md(facts.author)}**`);
  }
  const meta = metaMarkdown(facts);
  if (meta) {
    lines.push("", meta);
  }
  if (facts.subject) {
    const quoted = [md(facts.subject)];
    if (facts.body) {
      quoted.push(md(facts.body));
    }
    lines.push("", quote(`**${quoted[0]}**`));
    if (quoted[1]) {
      lines.push(quote(quoted[1]));
    }
  }
  if (facts.buildError) {
    lines.push("", "**Build error**", "", "```", facts.buildError, "```");
  }
  const links: string[] = [];
  if (facts.openUrl) {
    links.push(`[Open](${facts.openUrl})`);
  }
  if (facts.inspectUrl && facts.inspectUrl !== facts.openUrl) {
    links.push(`[Inspect](${facts.inspectUrl})`);
  }
  if (links.length > 0) {
    lines.push("", links.join(" · "));
  }
  lines.push("", md(facts.footer));
  return lines.join("\n").trim();
};

/**
 * Builds the shared card for ntfy and Gotify.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const deliveryCard = (webhook: VercelWebhook): DeliveryCard => {
  const facts = deliveryFacts(webhook);
  const title = clip(
    facts.author === "Versend"
      ? facts.title
      : `${facts.author} · ${facts.title}`,
    200
  );
  return {
    click: facts.openUrl ?? facts.inspectUrl,
    markdown: markdownCard(facts),
    title,
    tone: facts.tone,
  };
};
