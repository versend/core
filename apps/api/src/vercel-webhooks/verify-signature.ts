import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Checks the Vercel HMAC-SHA1 signature.
 *
 * @param rawBody - Raw webhook body.
 * @param signature - x-vercel-signature header.
 * @param secret - Integration secret.
 * @returns The result.
 */
export const verifySignature = (
  rawBody: string,
  signature: string | null,
  secret: string
): boolean => {
  if (!signature) {
    return false;
  }

  const expected = createHmac("sha1", secret).update(rawBody).digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
};
