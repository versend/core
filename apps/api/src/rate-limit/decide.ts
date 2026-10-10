import { ENV } from "../bootstrap/env";
import { clientIp } from "./client-ip";
import { takeSlot } from "./window";

export type RateLimitDecision =
  | { limited: false }
  | { limited: true; retryAfterSeconds: number; reset: number };

export function decideRateLimit(
  headers: Headers,
  now = Date.now()
): RateLimitDecision {
  const limit = ENV.RATE_LIMIT_REQUESTS;
  const windowSeconds = ENV.RATE_LIMIT_WINDOW_SECONDS;
  if (limit <= 0 || windowSeconds <= 0) {
    return { limited: false };
  }

  const slot = takeSlot(clientIp(headers), now, limit, windowSeconds * 1000);
  if (slot.allowed) {
    return { limited: false };
  }

  return {
    limited: true,
    reset: slot.reset,
    retryAfterSeconds: Math.max(1, Math.ceil((slot.reset - now) / 1000)),
  };
}
