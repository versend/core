import { webhookSchema } from "./payload";
import type { VercelWebhook } from "./payload";

const reportedIssues = 5;

/**
 * Outcome of parsing a raw webhook body.
 */
export type ParsedWebhook =
  | { ok: true; webhook: VercelWebhook }
  | { ok: false; error: "invalid_json" | "invalid_payload"; detail: string };

/**
 * Parses and validates a raw webhook body.
 *
 * @param rawBody - Raw request body.
 * @returns The result.
 */
export const parseWebhook = (rawBody: string): ParsedWebhook => {
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return { detail: "invalid_json", error: "invalid_json", ok: false };
  }

  const parsed = webhookSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.issues
      .map((issue) => issue.path.join("."))
      .slice(0, reportedIssues)
      .join(",");
    return {
      detail: `invalid_payload ${fields}`,
      error: "invalid_payload",
      ok: false,
    };
  }

  return { ok: true, webhook: parsed.data };
};
