const secondsThreshold = 1_000_000_000_000;

/**
 * Converts a Vercel `createdAt` (seconds or milliseconds) to ISO-8601.
 *
 * @param value - Webhook timestamp.
 * @returns The result.
 */
export const notificationTimestamp = (value: number): string => {
  const milliseconds = value < secondsThreshold ? value * 1000 : value;
  const date = new Date(milliseconds);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
};
