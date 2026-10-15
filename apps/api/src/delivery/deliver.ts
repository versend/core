import type { VercelWebhook } from "@/vercel-webhooks/payload";

import { enabledDestinations } from "./destinations";
import type { EnabledDestination } from "./destinations";

const attempt = async (
  destination: EnabledDestination,
  webhook: VercelWebhook
): Promise<string | undefined> => {
  try {
    await destination.send(webhook);
    return undefined;
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    return `${destination.name}: ${reason}`;
  }
};

/**
 * Posts the webhook to every configured destination in parallel. One failing
 * destination never cancels another.
 *
 * @param webhook - Verified Vercel webhook.
 */
export const deliver = async (webhook: VercelWebhook): Promise<void> => {
  const outcomes = await Promise.all(
    enabledDestinations().map((destination) => attempt(destination, webhook))
  );
  const failures = outcomes.filter(
    (outcome): outcome is string => outcome !== undefined
  );
  if (failures.length > 0) {
    console.error(
      `delivery failed for ${failures.length} destination(s): ${failures.join(", ")}`
    );
  }
};
