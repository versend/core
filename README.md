# Versend

Vercel events, delivered to Discord, Telegram, or any HTTP endpoint.

`apps/docs` is the hosted guide. `apps/api` is the relay people run themselves.

## Docker

Pushes to `master` publish `ghcr.io/kwaytv/versend` (`linux/amd64` and `linux/arm64`). The first package is private. Set it to public under the repository's Packages page, or add `ghcr.io` as a registry in Portainer.

In Portainer: **Stacks → Add stack → Web editor**. Paste this, then set `WEBHOOK_INTEGRATION_SECRET` and at least one destination in the stack environment variables.

```yaml
services:
  versend:
    image: ghcr.io/kwaytv/versend:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: "3000"
      WEBHOOK_INTEGRATION_SECRET: ${WEBHOOK_INTEGRATION_SECRET}
      DISCORD_WEBHOOK_URL: ${DISCORD_WEBHOOK_URL:-}
      DISCORD_WEBHOOK_USERNAME: ${DISCORD_WEBHOOK_USERNAME:-Versend}
      DISCORD_WEBHOOK_AVATAR_URL: ${DISCORD_WEBHOOK_AVATAR_URL:-}
      TELEGRAM_BOT_TOKEN: ${TELEGRAM_BOT_TOKEN:-}
      TELEGRAM_CHAT_ID: ${TELEGRAM_CHAT_ID:-}
      HTTP_DESTINATION_URL: ${HTTP_DESTINATION_URL:-}
      FILTER_EVENTS: ${FILTER_EVENTS:-}
      FILTER_EVENTS_EXCLUDE: ${FILTER_EVENTS_EXCLUDE:-}
      FILTER_TARGETS: ${FILTER_TARGETS:-}
      RATE_LIMIT_REQUESTS: ${RATE_LIMIT_REQUESTS:-60}
      RATE_LIMIT_WINDOW_SECONDS: ${RATE_LIMIT_WINDOW_SECONDS:-60}
```

`POST /hooks/vercel` receives the Vercel webhook. `GET /health` lists configured destinations.

## Local

```bash
bun install
bun run dev
```

The API reads `apps/api/.env` through Varlock. The schema is `apps/api/.env.schema`.

## Vercel

Deploy `apps/api` as one project. Vercel detects the Hono app at `src/index.ts`. The docs site is not part of that deploy.
