import { createHmac, timingSafeEqual } from "node:crypto";

export function verifySignature(
  rawBody: string,
  signature: string | null,
  secret: string
): boolean {
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
}
