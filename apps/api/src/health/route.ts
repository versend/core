import { Hono } from "hono";

import { enabledDestinations } from "@/delivery/destinations";

export const health = new Hono();

health.get("/", (c) =>
  c.json({
    destinations: enabledDestinations().map((destination) => destination.name),
    ok: true,
  })
);
