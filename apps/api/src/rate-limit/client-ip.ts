/**
 * Reads the client address from proxy headers.
 *
 * @param headers - Incoming request headers.
 * @returns The result.
 */
export const clientIp = (headers: Headers): string => {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
};
