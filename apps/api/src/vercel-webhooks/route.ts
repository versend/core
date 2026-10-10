import { Hono } from "hono";

import { ENV } from "../bootstrap/env";
import { readWaitUntil, scheduleDelivery } from "../delivery/schedule";
import { decideRateLimit } from "../rate-limit/decide";
import { allowEvent } from "./allow-event";
import { allowTarget } from "./allow-target";
import { webhookSchema } from "./payload";
import { verifySignature } from "./verify-signature";

export const vercelWebhook = new Hono();

vercelWebhook.get("/", (c) =>
  c.json(
    {
      error: "method_not_allowed",
      ok: false,
    },
    405
  )
);

vercelWebhook.post("/", async (c) => {
  const decision = decideRateLimit(c.req.raw.headers);
  if (decision.limited) {
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
    return c.json({ error: "invalid_signature", ok: false }, 401);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return c.json({ error: "invalid_json", ok: false }, 400);
  }

  const parsed = webhookSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_payload", ok: false }, 400);
  }

  if (!allowEvent(parsed.data.type)) {
    return c.json({ ignored: "event", ok: true });
  }

  if (!allowTarget(parsed.data)) {
    return c.json({ ignored: "target", ok: true });
  }

  scheduleDelivery(
    readWaitUntil(() => c.executionCtx),
    parsed.data
  );
  return c.json({ ok: true });
});
