import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";

import { Frame, FrameHeader } from "@/components/ui/frame";
import { shikiThemes } from "@/lib/shiki";
import { dockerImage } from "@/lib/site";

const composeCode = `services:
  versend:
    image: ${dockerImage}:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      WEBHOOK_INTEGRATION_SECRET: \${WEBHOOK_INTEGRATION_SECRET}
      DISCORD_WEBHOOK_URL: \${DISCORD_WEBHOOK_URL}
      TELEGRAM_BOT_TOKEN: \${TELEGRAM_BOT_TOKEN}
      TELEGRAM_CHAT_ID: \${TELEGRAM_CHAT_ID}
      FILTER_EVENTS: deployment.succeeded,deployment.error`;

const composeLineCount = composeCode.split("\n").length;

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
 * Framed compose file shown in the hero.
 *
 * @returns The panel element.
 */
export const ComposePanel = () => (
  <Frame className="overflow-hidden">
    <FrameHeader>
      <span>compose.yaml</span>
      <span className="text-fd-muted-foreground/70 normal-case">
        {composeLineCount} lines
      </span>
    </FrameHeader>
    <ServerCodeBlock
      code={composeCode}
      codeblock={codeblock}
      lang="yaml"
      themes={shikiThemes}
    />
  </Frame>
);

/**
 * Framed terminal transcript shown in the hero.
 *
 * @returns The panel element.
 */
export const TerminalPanel = () => (
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
              <span className="text-fd-muted-foreground select-none">$ </span>
              <span className="text-fd-foreground">{line.text}</span>
            </>
          ) : (
            <span className="text-fd-muted-foreground">{line.text}</span>
          )}
        </span>
      ))}
    </pre>
  </Frame>
);
