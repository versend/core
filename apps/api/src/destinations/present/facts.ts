import type { VercelEventName } from "../../vercel-webhooks/event-names";
import { metaText, type VercelWebhook } from "../../vercel-webhooks/payload";
import { absoluteHttp, clip, splitMessage } from "./text";
import { deliveryTitle } from "./title";
import { type DeliveryTone, deliveryMark, deliveryTone } from "./tone";

const home = "https://versend.io";
const githubName = /^[\w.-]+$/;
const gitSha = /^[a-f0-9]{7,40}$/i;

const openable = new Set<VercelEventName>([
  "deployment-ready",
  "deployment.promoted",
  "deployment.ready",
  "deployment.succeeded",
]);

export interface CommitFact {
  author?: string;
  short: string;
  url?: string;
}

export interface DeliveryFacts {
  author: string;
  authorUrl: string;
  body?: string;
  branch?: string;
  buildError?: string;
  commit?: CommitFact;
  createdAt: string;
  environment?: string;
  footer: string;
  inspectUrl?: string;
  mark?: string;
  openUrl?: string;
  subject?: string;
  title: string;
  tone: DeliveryTone;
}

export function deliveryFacts(webhook: VercelWebhook): DeliveryFacts {
  const tone = deliveryTone(webhook.type);
  const identity = authorFor(webhook);
  const deployment = isDeploymentEvent(webhook.type)
    ? webhook.payload.deployment
    : undefined;
  const meta = deployment?.meta;
  const commitMessage = metaText(meta, "githubCommitMessage");
  const message = commitMessage ? splitMessage(commitMessage) : undefined;
  const buildError = metaText(meta, "buildError");

  return {
    author: identity.author,
    authorUrl: identity.authorUrl,
    body: message?.body,
    branch: metaText(meta, "githubCommitRef"),
    buildError:
      isDeploymentError(webhook.type) && buildError
        ? clip(buildError.replaceAll("```", ""), 900)
        : undefined,
    commit: deployment ? commitFact(meta) : undefined,
    createdAt: createdAt(webhook.createdAt),
    environment: deployment
      ? (metaText(meta, "target") ?? webhook.payload.target ?? undefined)
      : undefined,
    footer: `${deployment?.id ?? webhook.id} · ${webhook.type}`,
    inspectUrl: deployment
      ? absoluteHttp(
          deployment.inspectorUrl ?? webhook.payload.links?.deployment
        )
      : undefined,
    mark: deliveryMark(webhook.type, tone),
    openUrl:
      deployment && openable.has(webhook.type)
        ? absoluteHttp(deployment.url)
        : undefined,
    subject: message?.subject || undefined,
    title: deliveryTitle(webhook.type),
    tone,
  };
}

function isDeploymentEvent(type: string): boolean {
  return (
    type === "deployment" ||
    type.startsWith("deployment.") ||
    type.startsWith("deployment-")
  );
}

function isDeploymentError(type: string): boolean {
  return type === "deployment.error" || type === "deployment-error";
}

function isDomainEvent(type: string): boolean {
  return (
    type === "domain-created" ||
    type.startsWith("domain.") ||
    type.startsWith("project.domain.") ||
    type.startsWith("project.domain-")
  );
}

function authorFor(webhook: VercelWebhook): {
  author: string;
  authorUrl: string;
} {
  const domain = webhook.payload.domain?.name;
  const project =
    webhook.payload.project?.name ?? webhook.payload.deployment?.name;
  const projectUrl = absoluteHttp(webhook.payload.links?.project) ?? home;

  if (isDomainEvent(webhook.type) && domain) {
    return { author: domain, authorUrl: absoluteHttp(domain) ?? home };
  }
  if (project) {
    return { author: project, authorUrl: projectUrl };
  }
  return { author: "Versend", authorUrl: home };
}

function commitFact(
  meta: Record<string, unknown> | undefined
): CommitFact | undefined {
  const sha = metaText(meta, "githubCommitSha");
  if (!sha) {
    return undefined;
  }

  const org = metaText(meta, "githubCommitOrg") ?? metaText(meta, "githubOrg");
  const repo =
    metaText(meta, "githubCommitRepo") ?? metaText(meta, "githubRepo");
  const author =
    metaText(meta, "githubCommitAuthorLogin") ??
    metaText(meta, "githubCommitAuthorName");

  return {
    author,
    short: sha.slice(0, 7),
    url: githubCommitUrl(org, repo, sha),
  };
}

function githubCommitUrl(
  org: string | undefined,
  repo: string | undefined,
  sha: string
): string | undefined {
  if (!(org && repo && githubName.test(org) && githubName.test(repo))) {
    return undefined;
  }
  if (!gitSha.test(sha)) {
    return undefined;
  }
  return `https://github.com/${org}/${repo}/commit/${sha}`;
}

function createdAt(value: number): string {
  const milliseconds = value < 1_000_000_000_000 ? value * 1000 : value;
  const date = new Date(milliseconds);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}
