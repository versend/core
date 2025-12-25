import { env } from "@/env";
import type { WebhookType } from "@/schemas/vercel";

const allowedEvents: Set<string> | null = env.FILTER_EVENTS
  ? new Set(env.FILTER_EVENTS.split(",").map((e) => e.trim()))
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
