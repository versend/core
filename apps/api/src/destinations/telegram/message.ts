import type { VercelWebhook } from "../../vercel-webhooks/payload";
import type { CommitFact, DeliveryFacts } from "../present/facts";
import { deliveryFacts } from "../present/facts";

export function telegramMessage(webhook: VercelWebhook): string {
  const facts = deliveryFacts(webhook);
  const lines = [`<b>${heading(facts)}</b>`];

  const meta = metaLine(facts);
  if (facts.author !== "Versend") {
    lines.push("", `<b>${escapeHtml(facts.author)}</b>`);
    if (meta) {
      lines.push(meta);
    }
  } else if (meta) {
    lines.push("", meta);
  }

  const quote = commitQuote(facts);
  if (quote) {
    lines.push("", quote);
  }
  if (facts.buildError) {
    lines.push(
      "",
      "<b>Build error</b>",
      `<pre>${escapeHtml(facts.buildError)}</pre>`
    );
  }

  const links = linkLine(facts);
  if (links) {
    lines.push("", links);
  }

  return lines.join("\n");
}

function heading(facts: DeliveryFacts): string {
  const title = escapeHtml(facts.title);
  return facts.mark ? `${facts.mark} ${title}` : title;
}

function metaLine(facts: DeliveryFacts): string | undefined {
  const bits: string[] = [];
  if (facts.environment) {
    bits.push(`<code>${escapeHtml(facts.environment)}</code>`);
  }
  if (facts.branch) {
    bits.push(`<code>${escapeHtml(facts.branch)}</code>`);
  }
  const { commit } = facts;
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
}

function commitBit(commit: CommitFact): string {
  const short = escapeHtml(commit.short);
  if (!commit.url) {
    return `<code>${short}</code>`;
  }
  return `<a href="${escapeAttr(commit.url)}">${short}</a>`;
}

function commitQuote(facts: DeliveryFacts): string | undefined {
  if (!facts.subject) {
    return undefined;
  }

  const subject = `<b>${escapeHtml(facts.subject)}</b>`;
  if (!facts.body) {
    return `<blockquote>${subject}</blockquote>`;
  }
  return `<blockquote>${subject}\n${escapeHtml(facts.body)}</blockquote>`;
}

function linkLine(facts: DeliveryFacts): string | undefined {
  const links: string[] = [];
  if (facts.openUrl) {
    links.push(`<a href="${escapeAttr(facts.openUrl)}">Open</a>`);
  }
  if (facts.inspectUrl && facts.inspectUrl !== facts.openUrl) {
    links.push(`<a href="${escapeAttr(facts.inspectUrl)}">Inspect</a>`);
  }
  if (links.length === 0) {
    return undefined;
  }
  return links.join(" · ");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
