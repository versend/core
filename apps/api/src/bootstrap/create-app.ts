import { Hono } from "hono";

import { health } from "../health/route";
import { vercelWebhook } from "../vercel-webhooks/route";

export function createApp(): Hono {
  const app = new Hono();

  app.route("/health", health);
  app.route("/hooks/vercel", vercelWebhook);
  app.notFound((c) => c.json({ error: "not_found", ok: false }, 404));

  return app;
}
