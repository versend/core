import { isDomainEvent } from "@/vercel-webhooks/event-kinds";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { absoluteHttp } from "./http-url";

/**
 * Name shown when the webhook names neither a project nor a domain.
 */
export const defaultAuthor = "Versend";
const home = "https://versend.io";

/**
 * Who the notification is about: a project, a domain, or Versend itself.
 */
export interface NotificationAuthor {
  author: string;
  authorUrl: string;
}

/**
 * Picks the project or domain a webhook concerns.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const notificationAuthor = (
  webhook: VercelWebhook
): NotificationAuthor => {
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
  return { author: defaultAuthor, authorUrl: home };
};
