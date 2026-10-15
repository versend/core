import type { VercelEventName } from "@/vercel-webhooks/event-names";

import type { NotificationTone } from "./tone";

const markByTone: Partial<Record<NotificationTone, string>> = {
  failure: "❌",
  notice: "✦",
  progress: "⏳",
  success: "✅",
};

const isCancellation = (type: string): boolean =>
  type.endsWith("aborted") ||
  type.endsWith("canceled") ||
  type.endsWith(".cancel");

/**
 * Status glyph shown in front of a notification title.
 *
 * @param type - Vercel event name.
 * @param tone - Notification tone.
 * @returns The result.
 */
export const notificationMark = (
  type: VercelEventName,
  tone: NotificationTone
): string | undefined => {
  if (type === "alerts.triggered") {
    return "🚨";
  }
  if (type === "deployment.promoted") {
    return "⬆️";
  }
  if (type === "deployment.rollback") {
    return "↩️";
  }
  if (isCancellation(type)) {
    return "🚫";
  }
  return markByTone[tone];
};
