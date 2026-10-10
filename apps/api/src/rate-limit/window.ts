const hits = new Map<string, number[]>();

const pruneExpired = (start: number): void => {
  if (hits.size < 5000) {
    return;
  }

  for (const [key, times] of hits) {
    if (times.every((at) => at <= start)) {
      hits.delete(key);
    }
  }
};

/**
 * Records a hit in the sliding window.
 *
 * @param key - Rate-limit bucket key.
 * @param now - Current time in milliseconds.
 * @param limit - Maximum hits in the window.
 * @param windowMs - Window length in milliseconds.
 * @returns The result.
 */
export const takeSlot = (
  key: string,
  now: number,
  limit: number,
  windowMs: number
): { allowed: true } | { allowed: false; reset: number } => {
  const start = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((at) => at > start);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return { allowed: false, reset: oldest + windowMs };
  }

  recent.push(now);
  hits.set(key, recent);
  pruneExpired(start);
  return { allowed: true };
};
