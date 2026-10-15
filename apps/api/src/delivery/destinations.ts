import { discord } from "@/destinations/discord/destination";
import { gotify } from "@/destinations/gotify/destination";
import { ntfy } from "@/destinations/ntfy/destination";
import { slack } from "@/destinations/slack/destination";
import { telegram } from "@/destinations/telegram/destination";

import type { Destination, DestinationName, Sender } from "./destination";

/**
 * Every destination the relay knows about, in delivery order.
 */
export const destinations: readonly Destination[] = [
  discord,
  telegram,
  slack,
  ntfy,
  gotify,
];

/**
 * A destination whose credentials are set.
 */
export interface EnabledDestination {
  name: DestinationName;
  send: Sender;
}

/**
 * Destinations that have credentials configured.
 *
 * @returns The result.
 */
export const enabledDestinations = (): EnabledDestination[] => {
  const enabled: EnabledDestination[] = [];
  for (const destination of destinations) {
    const send = destination.configure();
    if (send) {
      enabled.push({ name: destination.name, send });
    }
  }
  return enabled;
};
