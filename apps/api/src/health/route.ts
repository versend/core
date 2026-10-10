import { Hono } from "hono";

import { enabledDestinationNames } from "../delivery/enabled";

export const health = new Hono();

health.get("/", (c) =>
  c.json({
    destinations: enabledDestinationNames(),
    ok: true,
  })
);
