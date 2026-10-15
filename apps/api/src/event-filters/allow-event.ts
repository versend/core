import { ENV } from "@/config/env";
import type { VercelEventName } from "@/vercel-webhooks/event-names";

import { nameList } from "./name-list";

/**
 * Keeps the event unless `FILTER_EVENTS_EXCLUDE` names it or `FILTER_EVENTS`
 * is set and leaves it out.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const allowEvent = (type: VercelEventName): boolean => {
  const excluded = nameList(ENV.FILTER_EVENTS_EXCLUDE);
  if (excluded?.has(type)) {
    return false;
  }

  const allowed = nameList(ENV.FILTER_EVENTS);
  if (!allowed) {
    return true;
  }

  return allowed.has(type);
};
