import "./bootstrap/load-env";

import { ENV } from "./bootstrap/env";
import { createApp } from "./bootstrap/create-app";

const app = createApp();

export default {
  fetch: app.fetch,
  port: ENV.PORT,
};
