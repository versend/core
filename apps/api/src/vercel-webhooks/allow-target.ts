import { ENV } from "../bootstrap/env";
import { metaText, type VercelWebhook } from "./payload";

export function allowTarget(webhook: VercelWebhook): boolean {
  const allowed = list(ENV.FILTER_TARGETS);
  if (!(allowed && webhook.type.startsWith("deployment."))) {
    return true;
  }

  const target =
    metaText(webhook.payload.deployment?.meta, "target") ??
    webhook.payload.target ??
    "preview";

  return allowed.has(target.toLowerCase());
}

function list(value: string | undefined): Set<string> | null {
  const names = value
    ?.split(",")
    .map((name) => name.trim().toLowerCase())
    .filter((name) => name.length > 0);
  if (!names || names.length === 0) {
    return null;
  }

  return new Set(names);
}
