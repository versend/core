<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

# Architecture

The folder tree states what the product does before it states which framework runs it. Keep it that way.

## Rules

- Group by domain or feature first. Technical layers (`lib/`, `ui/`) exist only for code that genuinely has no domain.
- One responsibility per file. Split a file as soon as it holds a second concern; do not wait for it to get long.
- A folder holds files or folders, not both. The only exceptions are framework entry points (`src/index.ts`, `app/layout.tsx`, `app/global.css`, `src/proxy.ts`).
- Keep folders under roughly ten files. When one grows past that, split it by feature, not by adding a nested layer.
- No barrel files, no `utils/`, `common/`, `helpers/`, `misc/`, `shared.ts`. Name the thing the file is about.
- Imports: `./sibling` inside a folder, `@/domain/file` across folders, never `../`.
- Cross-domain dependencies point along the data flow (see below). A destination never imports another destination.
- Exported functions and types carry a JSDoc sentence; constants with a meaning (lengths, thresholds) are named, not inlined.
- Prefer explicit code over a clever abstraction. Repeat a two-line pattern twice; extract it the third time.

## `apps/api` (the relay)

Folders follow the request through the process:

| Folder | Owns |
| --- | --- |
| `config/` | Environment loading, generated `ENV` types, `present()` |
| `server/` | Hono app wiring |
| `vercel-webhooks/` | Signature, payload schema, event names and kinds, parsing, route |
| `event-filters/` | `FILTER_*` decisions |
| `rate-limit/` | In-process sliding window |
| `notifications/` | Destination-neutral `Notification` built from a webhook |
| `destinations/` | One folder per channel: `destination.ts`, `post.ts`, its renderer |
| `delivery/` | `Destination` contract, registry, fan-out, retry |
| `health/` | `GET /health` |

Dependency direction: `vercel-webhooks` → `event-filters` → `notifications` → `destinations` → `delivery`. `health` and `server` sit on top.

Adding a destination: create `destinations/<name>/` with `destination.ts` (reads `ENV`, returns a sender or `undefined`), `post.ts` (HTTP only), and a renderer that consumes `Notification`. Register it in `delivery/destinations.ts`. Nothing else changes.

## `apps/docs` (the site)

`app/` holds Next.js routes only; every route delegates to a feature folder in `components/`:

| Folder        | Owns                                                        |
| ------------- | ----------------------------------------------------------- |
| `docs-shell/` | Sidebar, drawer, island, ⌘B shortcut                        |
| `docs-page/`  | Article, breadcrumb, pagination, table of contents, actions |
| `landing/`    | One file per landing section                                |
| `preview/`    | Interactive event → destination preview                     |
| `mdx/`        | MDX component overrides                                     |
| `site/`       | Chrome shared by landing and docs                           |
| `ui/`         | Presentational primitives with no domain knowledge          |

`lib/` holds `site.ts` (name, repository, image), `routes.ts` (URL builders), `source.ts` (Fumadocs loader), `shiki.ts`, `cn.ts`.
