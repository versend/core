import "./bootstrap/load-env";
import { createApp } from "./bootstrap/create-app";
import { ENV } from "./bootstrap/env";

const app = createApp();

export default {
  fetch: app.fetch,
  port: ENV.PORT,
};
