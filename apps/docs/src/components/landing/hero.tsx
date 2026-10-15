import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { shikiThemes } from "@/lib/shiki";

import { CopyCommand } from "./copy-command";
import { Frame, FrameHeader } from "./frame";
import { Section, SectionContent } from "./section";

const composeCode = `services:
  versend:
    image: ghcr.io/versend/versend:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      WEBHOOK_INTEGRATION_SECRET: \${WEBHOOK_INTEGRATION_SECRET}
      DISCORD_WEBHOOK_URL: \${DISCORD_WEBHOOK_URL}
      TELEGRAM_BOT_TOKEN: \${TELEGRAM_BOT_TOKEN}
      TELEGRAM_CHAT_ID: \${TELEGRAM_CHAT_ID}
      FILTER_EVENTS: deployment.succeeded,deployment.error`;

const terminalLines = [
  { kind: "cmd", text: "docker compose up -d" },
  { kind: "out", text: " ✔ Container versend  Started" },
  { kind: "cmd", text: "curl -s localhost:3000/health" },
  {
    kind: "out",
    text: '{ "ok": true, "destinations": ["discord", "telegram"] }',
  },
] as const;

const codeblock = {
  allowCopy: false,
  className:
    "my-0 rounded-none border-0 bg-transparent [&_pre]:py-3.5 [&_.line]:text-xs",
} as const;

/**
 * Landing hero: headline on the left, a compose file and a terminal on the
 * right, both drawn as framed panels.
 *
 * @returns The hero section.
 */
export const Hero = () => (
  <Section className="grid-paper">
    <SectionContent className="lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        <div className="flex flex-col items-start">
          <p className="text-fd-muted-foreground text-2xs mb-5 inline-flex items-center gap-2 font-mono tracking-wider uppercase">
            <span className="bg-fd-success size-1.5" />
            Self-hosted · one container
          </p>
          <h1 className="text-fd-foreground max-w-xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
            <span className="border-fd-foreground/40 border-b border-dashed">
              Vercel
            </span>{" "}
            events, in the channels you already watch.
          </h1>
          <p className="text-fd-muted-foreground mt-5 max-w-md text-base leading-relaxed">
            Versend verifies the webhook signature, applies your filters and
            posts a clean card to Discord, Telegram, Slack, ntfy or Gotify. No
            database, no dashboard, no account.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              className="bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-flex h-10 items-center gap-2 px-4 text-sm font-medium transition-colors"
              href="/docs"
            >
              Read the docs
              <ArrowRightIcon className="size-4" />
            </Link>
            <CopyCommand command="docker pull ghcr.io/versend/versend" />
          </div>
        </div>

        <div className="grid gap-4">
          <Frame className="overflow-hidden">
            <FrameHeader>
              <span>compose.yaml</span>
              <span className="text-fd-muted-foreground/70 normal-case">
                13 lines
              </span>
            </FrameHeader>
            <ServerCodeBlock
              code={composeCode}
              codeblock={codeblock}
              lang="yaml"
              themes={shikiThemes}
            />
          </Frame>
          <Frame className="overflow-hidden">
            <FrameHeader>
              <span>terminal</span>
              <span className="flex items-center gap-1.5 normal-case">
                <span className="bg-fd-success size-1.5" />
                healthy
              </span>
            </FrameHeader>
            <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs leading-relaxed">
              {terminalLines.map((line) => (
                <span className="block" key={line.text}>
                  {line.kind === "cmd" ? (
                    <>
                      <span className="text-fd-muted-foreground select-none">
                        ${" "}
                      </span>
                      <span className="text-fd-foreground">{line.text}</span>
                    </>
                  ) : (
                    <span className="text-fd-muted-foreground">
                      {line.text}
                    </span>
                  )}
                </span>
              ))}
            </pre>
          </Frame>
        </div>
      </div>
    </SectionContent>
  </Section>
);
