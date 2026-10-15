import type { VercelEventName } from "./event-names";

const liveDeployments = new Set<VercelEventName>([
  "deployment-ready",
  "deployment.promoted",
  "deployment.ready",
  "deployment.succeeded",
]);

/**
 * Whether the event concerns a deployment.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const isDeploymentEvent = (type: VercelEventName): boolean =>
  type === "deployment" ||
  type.startsWith("deployment.") ||
  type.startsWith("deployment-");

/**
 * Whether the event reports a failed deployment.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const isDeploymentError = (type: VercelEventName): boolean =>
  type === "deployment.error" || type === "deployment-error";

/**
 * Whether the deployment is reachable at its URL after this event.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const isLiveDeployment = (type: VercelEventName): boolean =>
  liveDeployments.has(type);

/**
 * Whether the event concerns a domain.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const isDomainEvent = (type: VercelEventName): boolean =>
  type === "domain-created" ||
  type.startsWith("domain.") ||
  type.startsWith("project.domain.") ||
  type.startsWith("project.domain-");
