# vercel-webhook Specification

## Purpose

Accept a signed Vercel webhook and deliver it to the destinations configured on this process.

## Requirements

### Requirement: Verify the signature

The API SHALL reject `POST /hooks/vercel` unless `x-vercel-signature` is the HMAC-SHA1 hex digest of the raw body using `WEBHOOK_INTEGRATION_SECRET`.

#### Scenario: Missing or wrong signature

- **WHEN** the header is missing or does not match
- **THEN** the API responds `401` with `error: invalid_signature`

### Requirement: Accept a known Vercel event

The API SHALL accept a signed body whose `type` is a [Vercel webhook event](https://vercel.com/docs/webhooks/webhooks-api), including legacy event types Vercel still delivers, and whose payload matches the relay schema.

#### Scenario: Valid deployment event

- **WHEN** the signature matches and the payload parses
- **THEN** the API responds `200` with `ok: true` and schedules delivery

### Requirement: Filter events and targets

The API SHALL drop events listed in `FILTER_EVENTS_EXCLUDE`, events outside `FILTER_EVENTS` when that list is set, and deployment events whose target is outside `FILTER_TARGETS` when that list is set.

#### Scenario: Excluded event

- **WHEN** the event type is listed in `FILTER_EVENTS_EXCLUDE`
- **THEN** the API responds `200` with `ignored: event` and does not deliver

### Requirement: Limit requests in process memory

The API SHALL rate limit by client IP inside the process. It SHALL NOT call an external rate-limit service.

#### Scenario: Limit exceeded

- **WHEN** the IP exceeds `RATE_LIMIT_REQUESTS` inside `RATE_LIMIT_WINDOW_SECONDS`
- **THEN** the API responds `429` with `error: rate_limited`

#### Scenario: Limit disabled

- **WHEN** `RATE_LIMIT_REQUESTS` is `0`
- **THEN** the API does not rate limit

### Requirement: Deliver to configured destinations

The API SHALL deliver an accepted event to each destination that has its credentials set: Discord, Telegram, Slack, ntfy, and Gotify. A generic HTTP endpoint SHALL NOT be a destination.

#### Scenario: Discord and Telegram are set

- **WHEN** `DISCORD_WEBHOOK_URL`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID` are non-empty
- **THEN** both destinations receive the event, and a failure in one does not cancel the other

#### Scenario: Slack, ntfy, and Gotify are set

- **WHEN** `SLACK_WEBHOOK_URL`, `NTFY_URL`, `GOTIFY_URL`, and `GOTIFY_TOKEN` are non-empty
- **THEN** those destinations receive the event, and a failure in one does not cancel the others

#### Scenario: Health

- **WHEN** a client calls `GET /health`
- **THEN** the response lists the destination names that are configured
