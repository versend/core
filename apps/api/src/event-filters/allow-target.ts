import { ENV } from "@/config/env";
import { isDeploymentEvent } from "@/vercel-webhooks/event-kinds";
import { metaText } from "@/vercel-webhooks/payload";
import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { nameList } from "./name-list";

const defaultTarget = "preview";

/**
 * Keeps the deployment unless `FILTER_TARGETS` is set and leaves its target
 * out. Events that are not deployments always pass.
 *
 * @param webhook - Verified Vercel webhook.
 * @returns The result.
 */
export const allowTarget = (webhook: VercelWebhook): boolean => {
  const allowed = nameList(ENV.FILTER_TARGETS?.toLowerCase());
  if (!(allowed && isDeploymentEvent(webhook.type))) {
    return true;
  }

  const target =
    metaText(webhook.payload.deployment?.meta, "target") ??
    webhook.payload.target ??
    defaultTarget;

  return allowed.has(target.toLowerCase());
};
