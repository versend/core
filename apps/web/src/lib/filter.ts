import { env } from "@/env";
import type { VercelWebhook, WebhookType } from "@/schemas/vercel";

const allowedEvents: Set<string> | null = env.FILTER_EVENTS
  ? new Set(env.FILTER_EVENTS.split(",").map((e) => e.trim()))
  : null;

const allowedTargets: Set<string> | null = env.FILTER_TARGETS
  ? new Set(env.FILTER_TARGETS.split(",").map((t) => t.trim().toLowerCase()))
  : null;

/**
 * Check if an event type should trigger notifications.
 * If FILTER_EVENTS is not set, all events are allowed.
 * If set, only events in the comma-separated list are allowed.
 */
export function isEventAllowed(type: WebhookType): boolean {
  if (!allowedEvents) {
    return true;
  }
  return allowedEvents.has(type);
}

/**
 * Check if a deployment target should trigger notifications.
 * If FILTER_TARGETS is not set, all targets are allowed.
 * If set, only deployments to listed targets (production, preview) are allowed.
 */
export function isTargetAllowed(webhook: VercelWebhook): boolean {
  if (!allowedTargets) {
    return true;
  }

  // Only applies to deployment events
  if (!webhook.type.startsWith("deployment.")) {
    return true;
  }

  const target =
    webhook.payload.deployment?.meta?.target ||
    webhook.payload.target ||
    "preview";

  return allowedTargets.has(target.toLowerCase());
}
