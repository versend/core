import type { VercelWebhook } from "@/vercel-webhooks/payload";

/**
 * Name reported by `GET /health`.
 */
export type DestinationName =
  | "discord"
  | "gotify"
  | "ntfy"
  | "slack"
  | "telegram";

/**
 * Posts one webhook to a destination that already has its credentials.
 */
export type Sender = (webhook: VercelWebhook) => Promise<void>;

/**
 * Contract every destination implements. Credentials come from the
 * environment, so a destination is on exactly when `configure` returns a
 * sender.
 */
export interface Destination {
  /** Binds the sender to its credentials, or `undefined` when unset. */
  configure: () => Sender | undefined;
  name: DestinationName;
}
