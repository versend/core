import type { VercelEventName } from "../../vercel-webhooks/event-names";

export type DeliveryTone =
  | "failure"
  | "neutral"
  | "notice"
  | "progress"
  | "success";

export function deliveryTone(type: VercelEventName): DeliveryTone {
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
}

export function deliveryMark(
  type: VercelEventName,
  tone: DeliveryTone
): string | undefined {
  if (type === "alerts.triggered") {
    return "🚨";
  }
  if (type === "deployment.promoted") {
    return "⬆️";
  }
  if (type === "deployment.rollback") {
    return "↩️";
  }
  if (
    type.endsWith("aborted") ||
    type.endsWith("canceled") ||
    type.endsWith(".cancel")
  ) {
    return "🚫";
  }
  if (tone === "success") {
    return "✅";
  }
  if (tone === "failure") {
    return "❌";
  }
  if (tone === "progress") {
    return "⏳";
  }
  if (tone === "notice") {
    return "✦";
  }
  return undefined;
}

function isNotice(type: string): boolean {
  return (
    type === "deployment.promoted" ||
    type === "deployment.rollback" ||
    type === "project.rolling-release.approved"
  );
}

function isFailure(type: string): boolean {
  return (
    type === "alerts.triggered" ||
    type === "marketplace.invoice.notpaid" ||
    type === "marketplace.invoice.overdue" ||
    type === "project-removed" ||
    type === "project.removed" ||
    type.endsWith("aborted") ||
    type.endsWith("error") ||
    type.endsWith("failed")
  );
}

function isProgress(type: string): boolean {
  return (
    type === "deployment" ||
    type === "deployment-check-rerequested" ||
    type === "deployment-prepared" ||
    type === "deployment.check-rerequested" ||
    type === "deployment.created" ||
    type.endsWith(".start") ||
    type.endsWith(".started")
  );
}

function isSuccess(type: string): boolean {
  return (
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
    type.endsWith(".succeeded")
  );
}
