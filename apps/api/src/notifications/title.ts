import type { VercelEventName } from "@/vercel-webhooks/event-names";

const wordBreak = /[.-]/u;

const titles: Partial<Record<VercelEventName, string>> = {
  "alerts.triggered": "Alert triggered",
  deployment: "Deployment started",
  "deployment-canceled": "Deployment canceled",
  "deployment-check-rerequested": "Checks requested",
  "deployment-checks-completed": "Checks completed",
  "deployment-error": "Deployment failed",
  "deployment-prepared": "Deployment prepared",
  "deployment-ready": "Deployment ready",
  "deployment.check-rerequested": "Checks requested",
  "deployment.cleanup": "Deployment cleaned up",
  "deployment.created": "Deployment started",
  "deployment.error": "Deployment failed",
  "deployment.integration.action.cancel": "Integration action canceled",
  "deployment.integration.action.cleanup": "Integration action cleaned up",
  "deployment.integration.action.start": "Integration action started",
  "deployment.rollback": "Deployment rolled back",
  "deployment.succeeded": "Deployment ready",
  "domain-created": "Domain created",
  "domain.auto-renew-changed": "Auto-renew changed",
  "domain.certificate-add": "Certificate added",
  "domain.certificate-add-failed": "Certificate failed",
  "domain.certificate-deleted": "Certificate deleted",
  "domain.certificate-renew": "Certificate renewed",
  "domain.certificate-renew-failed": "Certificate renewal failed",
  "domain.dns-records-changed": "DNS records changed",
  "domain.renewal": "Domain renewed",
  "domain.renewal-failed": "Domain renewal failed",
  "domain.transfer-in-completed": "Transfer completed",
  "domain.transfer-in-failed": "Transfer failed",
  "domain.transfer-in-started": "Transfer started",
  "integration-configuration-permission-updated":
    "Integration permissions updated",
  "integration-configuration-removed": "Integration removed",
  "integration-configuration-scope-change-confirmed":
    "Integration scope confirmed",
  "integration-configuration.permission-upgraded":
    "Integration permissions upgraded",
  "integration-configuration.removed": "Integration removed",
  "integration-configuration.scope-change-confirmed":
    "Integration scope confirmed",
  "integration-configuration.transferred": "Integration transferred",
  "integration-resource.project-connected": "Project connected",
  "integration-resource.project-disconnected": "Project disconnected",
  "marketplace.invoice.created": "Invoice created",
  "marketplace.invoice.notpaid": "Invoice unpaid",
  "marketplace.invoice.overdue": "Invoice overdue",
  "marketplace.invoice.paid": "Invoice paid",
  "marketplace.invoice.refunded": "Invoice refunded",
  "marketplace.member.changed": "Marketplace member changed",
  "project-created": "Project created",
  "project-removed": "Project removed",
  "project.domain-created": "Domain added",
  "project.domain-deleted": "Domain removed",
  "project.domain-moved": "Domain moved",
  "project.domain-unverified": "Domain unverified",
  "project.domain-updated": "Domain updated",
  "project.domain-verified": "Domain verified",
  "project.domain.created": "Domain added",
  "project.domain.deleted": "Domain removed",
  "project.domain.moved": "Domain moved",
  "project.domain.unverified": "Domain unverified",
  "project.domain.updated": "Domain updated",
  "project.domain.verified": "Domain verified",
  "project.env-variable.created": "Environment variable created",
  "project.env-variable.deleted": "Environment variable deleted",
  "project.env-variable.updated": "Environment variable updated",
  "project.rolling-release.aborted": "Rolling release aborted",
  "project.rolling-release.approved": "Rolling release approved",
  "project.rolling-release.completed": "Rolling release completed",
  "project.rolling-release.started": "Rolling release started",
};

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

const sentence = (type: string): string => {
  const words = type.split(wordBreak);
  return words
    .map((word, index) => (index === 0 ? capitalize(word) : word))
    .join(" ");
};

/**
 * Human title of a Vercel event.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const notificationTitle = (type: VercelEventName): string =>
  titles[type] ?? sentence(type);
