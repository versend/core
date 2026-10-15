import type { VercelEventName } from "@/vercel-webhooks/event-names";

/**
 * Outcome class of a Vercel event. Destinations map it to a color or priority.
 */
export type NotificationTone =
  | "failure"
  | "neutral"
  | "notice"
  | "progress"
  | "success";

const isNotice = (type: string): boolean =>
  type === "deployment.promoted" ||
  type === "deployment.rollback" ||
  type === "project.rolling-release.approved";

const isFailure = (type: string): boolean =>
  type === "alerts.triggered" ||
  type === "marketplace.invoice.notpaid" ||
  type === "marketplace.invoice.overdue" ||
  type === "project-removed" ||
  type === "project.removed" ||
  type.endsWith("aborted") ||
  type.endsWith("error") ||
  type.endsWith("failed");

const isProgress = (type: string): boolean =>
  type === "deployment" ||
  type === "deployment-check-rerequested" ||
  type === "deployment-prepared" ||
  type === "deployment.check-rerequested" ||
  type === "deployment.created" ||
  type.endsWith(".start") ||
  type.endsWith(".started");

const isSuccess = (type: string): boolean =>
  type === "domain.certificate-add" ||
  type === "domain.certificate-renew" ||
  type === "domain-created" ||
  type === "domain.created" ||
  type === "domain.renewal" ||
  type === "deployment-ready" ||
  type === "project-created" ||
  type === "project.created" ||
  type === "project.domain-verified" ||
  type === "project.domain.verified" ||
  type.endsWith(".completed") ||
  type.endsWith("-completed") ||
  type.endsWith(".paid") ||
  type.endsWith(".ready") ||
  type.endsWith(".succeeded");

/**
 * Tone of a Vercel event.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const notificationTone = (type: VercelEventName): NotificationTone => {
  if (isNotice(type)) {
    return "notice";
  }
  if (isFailure(type)) {
    return "failure";
  }
  if (isProgress(type)) {
    return "progress";
  }
  if (isSuccess(type)) {
    return "success";
  }
  return "neutral";
};
