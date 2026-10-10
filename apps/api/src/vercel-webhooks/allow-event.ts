import { ENV } from "../bootstrap/env";
import type { VercelEventName } from "./event-names";

const list = (value: string | undefined): Set<string> | null => {
  const names = value
    ?.split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  if (!names || names.length === 0) {
    return null;
  }

  return new Set(names);
};

/**
 * Keeps the event unless the exclude list names it.
 *
 * @param type - Vercel event name.
 * @returns The result.
 */
export const allowEvent = (type: VercelEventName): boolean => {
  const excluded = list(ENV.FILTER_EVENTS_EXCLUDE);
  if (excluded?.has(type)) {
    return false;
  }

  const allowed = list(ENV.FILTER_EVENTS);
  if (!allowed) {
    return true;
  }

  return allowed.has(type);
};
