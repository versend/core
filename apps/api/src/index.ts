import "@/config/load-env";
import { ENV } from "@/config/env";
import { createApp } from "@/server/app";

const app = createApp();

export default {
  fetch: app.fetch,
  port: ENV.PORT,
};
