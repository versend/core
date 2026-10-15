"use client";

import {
  BellIcon,
  HashIcon,
  MessageSquareIcon,
  SendIcon,
  SmartphoneIcon,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/cn";

import { Frame, FrameHeader } from "./frame";
import { Eyebrow, Section, SectionContent, SectionTitle } from "./section";

type Tone = "failure" | "progress" | "success";

interface EventSample {
  body?: string;
  branch: string;
  buildError?: string;
  commit: string;
  environment: string;
  id: string;
  mark: string;
  subject: string;
  title: string;
  tone: Tone;
  type: string;
}

const startedEvent: EventSample = {
  branch: "main",
  commit: "a1b2c3d",
  environment: "production",
  id: "dpl_8f2a",
  mark: "⏳",
  subject: "Ship the billing page",
  title: "Deployment started",
  tone: "progress",
  type: "deployment.created",
};

const readyEvent: EventSample = {
  body: "Invoice download and the failed-payment state.",
  branch: "main",
  commit: "a1b2c3d",
  environment: "production",
  id: "dpl_8f2a",
  mark: "✅",
  subject: "Ship the billing page",
  title: "Deployment ready",
  tone: "success",
  type: "deployment.succeeded",
};

const failedEvent: EventSample = {
  branch: "feat/webhooks",
  buildError: "Type error: Property 'amount' is missing in type 'Invoice'.",
  commit: "9e8d7c6",
  environment: "preview",
  id: "dpl_41c0",
  mark: "❌",
  subject: "Retry failed webhooks",
  title: "Deployment failed",
  tone: "failure",
  type: "deployment.error",
};

const events = [startedEvent, readyEvent, failedEvent];

const project = "acme-web";

const toneBar: Record<Tone, string> = {
  failure: "bg-fd-error",
  progress: "bg-fd-warning",
  success: "bg-fd-success",
};

const toneText: Record<Tone, string> = {
  failure: "text-fd-error",
  progress: "text-fd-warning",
  success: "text-fd-success",
};

const ntfyPriority: Record<Tone, string> = {
  failure: "urgent",
  progress: "high",
  success: "default",
};

const Meta = ({ event }: { event: EventSample }) => (
  <span className="text-fd-muted-foreground font-mono text-xs">
    {event.environment} · {event.branch} · {event.commit}
  </span>
);

const BuildError = ({ event }: { event: EventSample }) =>
  event.buildError ? (
    <pre className="border-fd-border bg-fd-muted mt-3 overflow-x-auto border px-3 py-2 font-mono text-xs whitespace-pre-wrap">
      {event.buildError}
    </pre>
  ) : null;

const Links = () => (
  <p className="text-fd-foreground mt-3 text-xs underline decoration-dashed underline-offset-4">
    Open · Inspect
  </p>
);

const Discord = ({ event }: { event: EventSample }) => (
  <div className="flex gap-3 p-4">
    <span className="bg-fd-foreground size-9 shrink-0" />
    <div className="min-w-0 flex-1">
      <p className="text-sm">
        <span className="font-medium">Versend</span>{" "}
        <span className="border-fd-border bg-fd-muted text-2xs ms-1 border px-1 font-mono uppercase">
          app
        </span>
        <span className="text-fd-muted-foreground ms-2 text-xs">Today</span>
      </p>
      <div className="border-fd-border bg-fd-background mt-1.5 flex border">
        <span className={cn("w-1 shrink-0", toneBar[event.tone])} />
        <div className="min-w-0 flex-1 p-3">
          <p className="text-fd-muted-foreground text-xs font-medium">
            {project}
          </p>
          <p className="mt-1 text-sm font-semibold">{event.title}</p>
          <p className="mt-2 text-sm font-medium">{event.subject}</p>
          {event.body ? (
            <p className="text-fd-muted-foreground border-fd-border mt-1 border-l-2 ps-2 text-sm">
              {event.body}
            </p>
          ) : null}
          <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
            {[
              ["Environment", event.environment],
              ["Branch", event.branch],
              ["Commit", event.commit],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-medium">{label}</dt>
                <dd className="text-fd-muted-foreground mt-0.5 font-mono">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <BuildError event={event} />
          <p className="text-fd-muted-foreground text-2xs mt-3 font-mono">
            {event.id} · {event.type}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Telegram = ({ event }: { event: EventSample }) => (
  <div className="p-4">
    <div className="border-fd-border bg-fd-background max-w-sm border p-3 text-sm">
      <p className="font-semibold">
        {event.mark} {event.title}
      </p>
      <p className="mt-2 font-semibold">{project}</p>
      <Meta event={event} />
      <p className="border-fd-border mt-2 border-l-2 ps-2">
        <span className="font-medium">{event.subject}</span>
        {event.body ? (
          <span className="text-fd-muted-foreground block">{event.body}</span>
        ) : null}
      </p>
      <BuildError event={event} />
      <Links />
      <p className="text-fd-muted-foreground text-2xs mt-1 text-end font-mono">
        14:02
      </p>
    </div>
  </div>
);

const Slack = ({ event }: { event: EventSample }) => (
  <div className="flex gap-3 p-4">
    <span className="bg-fd-foreground size-9 shrink-0" />
    <div className="min-w-0 flex-1 text-sm">
      <p>
        <span className="font-semibold">Versend</span>{" "}
        <span className="border-fd-border bg-fd-muted text-2xs border px-1 font-mono uppercase">
          app
        </span>
        <span className="text-fd-muted-foreground ms-2 text-xs">2:02 PM</span>
      </p>
      <div className="border-fd-border mt-1.5 flex border-l-2">
        <div className="min-w-0 flex-1 ps-3">
          <p className="font-semibold">
            <span className={toneText[event.tone]}>■</span> {event.title}
          </p>
          <p className="text-fd-muted-foreground mt-0.5 text-xs">{project}</p>
          <p className="mt-2 font-medium">{event.subject}</p>
          {event.body ? (
            <p className="text-fd-muted-foreground">{event.body}</p>
          ) : null}
          <p className="mt-2">
            <Meta event={event} />
          </p>
          <BuildError event={event} />
          <Links />
        </div>
      </div>
    </div>
  </div>
);

const Ntfy = ({ event }: { event: EventSample }) => (
  <div className="p-4">
    <div className="border-fd-border bg-fd-background border p-3 text-sm">
      <p className="text-fd-muted-foreground text-2xs flex items-center justify-between font-mono">
        <span>versend</span>
        <span>{ntfyPriority[event.tone]}</span>
      </p>
      <p className="mt-2 font-semibold">
        {project} · {event.title}
      </p>
      <p className="mt-2">
        {event.mark} <span className="font-semibold">{project}</span>
      </p>
      <p className="mt-1">
        <Meta event={event} />
      </p>
      <p className="border-fd-border mt-2 border-l-2 ps-2 font-medium">
        {event.subject}
      </p>
      <BuildError event={event} />
      <div className="mt-3 flex gap-2">
        <span className="border-fd-border border px-2 py-1 text-xs">Open</span>
        <span className="border-fd-border border px-2 py-1 text-xs">
          Inspect
        </span>
      </div>
    </div>
  </div>
);

const Gotify = ({ event }: { event: EventSample }) => (
  <div className="p-4">
    <div className="border-fd-border bg-fd-background flex gap-3 border p-3 text-sm">
      <span className="bg-fd-foreground size-8 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-semibold">
            {project} · {event.title}
          </span>
          <span className="text-fd-muted-foreground text-2xs font-mono">
            just now
          </span>
        </p>
        <p className="mt-2">
          {event.mark} <span className="font-semibold">{project}</span>
        </p>
        <p className="mt-1">
          <Meta event={event} />
        </p>
        <p className="border-fd-border mt-2 border-l-2 ps-2 font-medium">
          {event.subject}
        </p>
        <BuildError event={event} />
        <p className="text-fd-muted-foreground text-2xs mt-3 font-mono">
          {event.id} · {event.type}
        </p>
      </div>
    </div>
  </div>
);

interface Destination {
  Icon: ComponentType<{ className?: string }>;
  Render: ComponentType<{ event: EventSample }>;
  env: string;
  name: string;
}

const discord: Destination = {
  Icon: MessageSquareIcon,
  Render: Discord,
  env: "DISCORD_WEBHOOK_URL",
  name: "Discord",
};

const destinations: Destination[] = [
  discord,
  {
    Icon: SendIcon,
    Render: Telegram,
    env: "TELEGRAM_BOT_TOKEN",
    name: "Telegram",
  },
  { Icon: HashIcon, Render: Slack, env: "SLACK_WEBHOOK_URL", name: "Slack" },
  { Icon: BellIcon, Render: Ntfy, env: "NTFY_URL", name: "ntfy" },
  {
    Icon: SmartphoneIcon,
    Render: Gotify,
    env: "GOTIFY_URL",
    name: "Gotify",
  },
];

const Tab = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    aria-pressed={active}
    className={cn(
      "hover:text-fd-foreground inline-flex h-8 items-center gap-2 border px-2.5 font-mono text-xs transition-colors",
      active
        ? "border-fd-foreground/60 bg-fd-background text-fd-foreground"
        : "border-fd-border text-fd-muted-foreground"
    )}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

const Payload = ({ event }: { event: EventSample }) => (
  <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs leading-relaxed">
    <span className="text-fd-muted-foreground">{"{\n"}</span>
    {[
      ["type", event.type],
      ["id", event.id],
      ["project", project],
      ["target", event.environment],
      ["branch", event.branch],
      ["commit", event.commit],
      ["message", event.subject],
    ].map(([key, value]) => (
      <span className="block ps-4" key={key}>
        <span className="text-fd-muted-foreground">{`"${key}"`}</span>
        <span className="text-fd-muted-foreground">: </span>
        <span className="text-fd-foreground">{`"${value}"`}</span>
        <span className="text-fd-muted-foreground">,</span>
      </span>
    ))}
    <span className="text-fd-muted-foreground block ps-4">…</span>
    <span className="text-fd-muted-foreground">{"}"}</span>
  </pre>
);

/**
 * Interactive section: pick a Vercel event and a destination to see the card
 * Versend posts.
 *
 * @returns The section element.
 */
export const Preview = () => {
  const [eventType, setEventType] = useState(readyEvent.type);
  const [destinationName, setDestinationName] = useState(discord.name);
  const event = events.find((entry) => entry.type === eventType) ?? readyEvent;
  const destination =
    destinations.find((entry) => entry.name === destinationName) ?? discord;
  const { Render } = destination;

  return (
    <Section id="preview">
      <SectionContent>
        <Eyebrow index="02">What lands in the channel</Eyebrow>
        <SectionTitle>The same event, drawn for each destination.</SectionTitle>
        <p className="text-fd-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
          Pick an event and a destination. Every card carries the project,
          target, branch, commit and message, plus the build error when there is
          one.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {events.map((entry) => (
            <Tab
              active={entry.type === event.type}
              key={entry.type}
              onClick={() => setEventType(entry.type)}
            >
              <span className={cn("size-1.5", toneBar[entry.tone])} />
              {entry.type}
            </Tab>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Frame className="overflow-hidden">
            <FrameHeader>
              <span>webhook</span>
              <span className="normal-case">POST /hooks/vercel</span>
            </FrameHeader>
            <Payload event={event} />
          </Frame>

          <Frame className="overflow-hidden">
            <FrameHeader className="h-auto flex-wrap gap-y-2 py-1.5">
              <div className="flex flex-wrap gap-1.5">
                {destinations.map((entry) => (
                  <Tab
                    active={entry.name === destination.name}
                    key={entry.name}
                    onClick={() => setDestinationName(entry.name)}
                  >
                    <entry.Icon className="size-3.5" />
                    {entry.name}
                  </Tab>
                ))}
              </div>
              <span className="normal-case">{destination.env}</span>
            </FrameHeader>
            <Render event={event} />
          </Frame>
        </div>
      </SectionContent>
    </Section>
  );
};
