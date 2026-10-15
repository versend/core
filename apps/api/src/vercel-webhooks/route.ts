import { Hono } from "hono";

import { ENV } from "@/config/env";
import { scheduleDelivery } from "@/delivery/schedule";
import { allowEvent } from "@/event-filters/allow-event";
import { allowTarget } from "@/event-filters/allow-target";
import { decideRateLimit } from "@/rate-limit/decide";

import { parseWebhook } from "./parse";
import { verifySignature } from "./verify-signature";

const note = (status: number, detail: string): void => {
  console.info(`hooks/vercel ${status} ${detail}`);
};

export const vercelWebhook = new Hono();

vercelWebhook.get("/", (c) =>
  c.json({ error: "method_not_allowed", ok: false }, 405)
);

vercelWebhook.post("/", async (c) => {
  const decision = decideRateLimit(c.req.raw.headers);
  if (decision.limited) {
    note(429, "rate_limited");
    return c.json(
      { error: "rate_limited", ok: false },
      {
        headers: {
          "Retry-After": decision.retryAfterSeconds.toString(),
          "X-RateLimit-Reset": decision.reset.toString(),
        },
        status: 429,
      }
    );
  }

  const rawBody = await c.req.text();
  const signature = c.req.header("x-vercel-signature") ?? null;
  if (!verifySignature(rawBody, signature, ENV.WEBHOOK_INTEGRATION_SECRET)) {
    note(401, signature ? "signature mismatch" : "signature missing");
    return c.json({ error: "invalid_signature", ok: false }, 401);
  }

  const parsed = parseWebhook(rawBody);
  if (!parsed.ok) {
    note(400, parsed.detail);
    return c.json({ error: parsed.error, ok: false }, 400);
  }

  const { webhook } = parsed;
  if (!allowEvent(webhook.type)) {
    note(200, `ignored event ${webhook.type}`);
    return c.json({ ignored: "event", ok: true });
  }

  if (!allowTarget(webhook)) {
    note(200, `ignored target ${webhook.type}`);
    return c.json({ ignored: "target", ok: true });
  }

  scheduleDelivery(webhook);
  note(200, webhook.type);
  return c.json({ ok: true });
});
