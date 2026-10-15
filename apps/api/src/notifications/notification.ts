import {
  isDeploymentError,
  isDeploymentEvent,
  isLiveDeployment,
} from "@/vercel-webhooks/event-kinds";
import { metaText } from "@/vercel-webhooks/payload";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { notificationAuthor } from "./author";
import { clip } from "./clip";
import { notificationCommit } from "./commit";
import type { NotificationCommit } from "./commit";
import { splitCommitMessage } from "./commit-message";
import { absoluteHttp } from "./http-url";
import { notificationMark } from "./mark";
import { notificationTimestamp } from "./timestamp";
import { notificationTitle } from "./title";
import { notificationTone } from "./tone";
import type { NotificationTone } from "./tone";

const buildErrorLength = 900;

/**
 * Destination-neutral content of one Vercel event. Every destination renders
 * this and nothing else.
 */
export interface Notification {
  author: string;
  authorUrl: string;
  body?: string;
  branch?: string;
  buildError?: string;
  commit?: NotificationCommit;
  createdAt: string;
  environment?: string;
  footer: string;
  inspectUrl?: string;
  mark?: string;
  openUrl?: string;
  subject?: string;
  title: string;
  tone: NotificationTone;
}

/**
 * Builds the notification for a webhook.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const buildNotification = (webhook: VercelWebhook): Notification => {
  const tone = notificationTone(webhook.type);
  const identity = notificationAuthor(webhook);
  const deployment = isDeploymentEvent(webhook.type)
    ? webhook.payload.deployment
    : undefined;
  const meta = deployment?.meta;
  const commitMessage = metaText(meta, "githubCommitMessage");
  const message = commitMessage ? splitCommitMessage(commitMessage) : undefined;
  const buildError = metaText(meta, "buildError");

  return {
    author: identity.author,
    authorUrl: identity.authorUrl,
    body: message?.body,
    branch: metaText(meta, "githubCommitRef"),
    buildError:
      isDeploymentError(webhook.type) && buildError
        ? clip(buildError.replaceAll("```", ""), buildErrorLength)
        : undefined,
    commit: deployment ? notificationCommit(meta) : undefined,
    createdAt: notificationTimestamp(webhook.createdAt),
    environment: deployment
      ? (metaText(meta, "target") ?? webhook.payload.target ?? undefined)
      : undefined,
    footer: `${deployment?.id ?? webhook.id} · ${webhook.type}`,
    inspectUrl: deployment
      ? absoluteHttp(
          deployment.inspectorUrl ?? webhook.payload.links?.deployment
        )
      : undefined,
    mark: notificationMark(webhook.type, tone),
    openUrl:
      deployment && isLiveDeployment(webhook.type)
        ? absoluteHttp(deployment.url)
        : undefined,
    subject: message?.subject || undefined,
    title: notificationTitle(webhook.type),
    tone,
  };
};
