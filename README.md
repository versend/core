# vercord

Vercel deployment notifications in Discord. Self-hosted webhook relay.

## Setup

```bash
bun install
bun run dev
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercord/core/tree/master/apps/web)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `WEBHOOK_INTEGRATION_SECRET` | Yes | Vercel webhook signing secret |
| `DISCORD_WEBHOOK_URL` | Yes | Discord webhook URL |
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis token |
| `DISCORD_WEBHOOK_USERNAME` | No | Custom bot username |
| `DISCORD_WEBHOOK_AVATAR_URL` | No | Custom bot avatar |

## Docs

[docs.vercord.lol](https://docs.vercord.lol)
