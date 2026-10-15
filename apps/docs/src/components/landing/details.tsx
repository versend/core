import {
  ArrowRightIcon,
  BellIcon,
  ContainerIcon,
  DatabaseZapIcon,
  FilterIcon,
  HashIcon,
  MessageSquareIcon,
  SendIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  TimerIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { CopyCommand } from "./copy-command";
import { Eyebrow, Section, SectionContent, SectionTitle } from "./section";

interface Destination {
  Icon: LucideIcon;
  body: string;
  href: string;
  name: string;
  vars: string;
}

const destinations: Destination[] = [
  {
    Icon: MessageSquareIcon,
    body: "A colored embed with inline fields and a footer. Username and avatar are yours to set.",
    href: "/docs/destinations/discord",
    name: "Discord",
    vars: "DISCORD_WEBHOOK_URL",
  },
  {
    Icon: SendIcon,
    body: "An HTML message from your bot into any chat or channel it belongs to.",
    href: "/docs/destinations/telegram",
    name: "Telegram",
    vars: "TELEGRAM_BOT_TOKEN · TELEGRAM_CHAT_ID",
  },
  {
    Icon: HashIcon,
    body: "An incoming webhook message with the same fields, rendered in mrkdwn.",
    href: "/docs/destinations/slack",
    name: "Slack",
    vars: "SLACK_WEBHOOK_URL",
  },
  {
    Icon: BellIcon,
    body: "A markdown push with a priority that follows the outcome and a click-through to the deployment.",
    href: "/docs/destinations/ntfy",
    name: "ntfy",
    vars: "NTFY_URL · NTFY_TOKEN",
  },
  {
    Icon: SmartphoneIcon,
    body: "A markdown message to your own Gotify server and whichever app token you choose.",
    href: "/docs/destinations/gotify",
    name: "Gotify",
    vars: "GOTIFY_URL · GOTIFY_TOKEN",
  },
];

const facts: { Icon: LucideIcon; body: string; title: string }[] = [
  {
    Icon: ShieldCheckIcon,
    body: "HMAC check on every request with your integration secret.",
    title: "Signed",
  },
  {
    Icon: FilterIcon,
    body: "Allow or exclude event types; restrict deployment targets.",
    title: "Filtered",
  },
  {
    Icon: TimerIcon,
    body: "Per-IP rate limit and retries with backoff on 429 and 5xx.",
    title: "Patient",
  },
  {
    Icon: DatabaseZapIcon,
    body: "No database. Configuration is environment variables only.",
    title: "Stateless",
  },
  {
    Icon: ContainerIcon,
    body: "One image for amd64 and arm64, published on every push to master.",
    title: "Portable",
  },
];

/**
 * Grid of supported destinations, each linking to its guide.
 *
 * @returns The section element.
 */
export const Destinations = () => (
  <Section id="destinations">
    <SectionContent>
      <Eyebrow index="03">Destinations</Eyebrow>
      <SectionTitle>Five channels. Set a variable, it is on.</SectionTitle>
      <ul className="divide-fd-border border-fd-border mt-10 grid divide-y border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
        {destinations.map((destination) => (
          <li
            className="border-fd-border group relative sm:border-b sm:nth-[2n+1]:border-r lg:border-b-0 lg:not-last:border-r"
            key={destination.name}
          >
            <Link
              className="hover:bg-fd-accent/40 flex h-full flex-col p-5 transition-colors"
              href={destination.href}
            >
              <destination.Icon className="text-fd-foreground size-5" />
              <h3 className="text-fd-foreground mt-4 text-base font-medium">
                {destination.name}
              </h3>
              <p className="text-fd-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                {destination.body}
              </p>
              <p className="text-fd-muted-foreground text-2xs mt-4 font-mono break-all">
                {destination.vars}
              </p>
              <span className="text-fd-muted-foreground group-hover:text-fd-foreground mt-3 inline-flex items-center gap-1 text-xs transition-colors">
                Guide
                <ArrowRightIcon className="size-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionContent>
  </Section>
);

/**
 * Short list of the relay's properties.
 *
 * @returns The section element.
 */
export const Facts = () => (
  <Section id="facts">
    <SectionContent>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <Eyebrow index="04">Why a relay</Eyebrow>
          <SectionTitle>Small on purpose.</SectionTitle>
          <p className="text-fd-muted-foreground mt-3 max-w-md text-base leading-relaxed">
            Vercel already knows what happened. Versend only has to prove the
            request is real, decide if you care, and say it once in each place.
            Everything else was left out.
          </p>
        </div>
        <dl className="divide-fd-border border-fd-border grid divide-y border">
          {facts.map((fact) => (
            <div className="flex gap-4 p-4" key={fact.title}>
              <fact.Icon className="text-fd-foreground mt-0.5 size-4 shrink-0" />
              <div>
                <dt className="text-fd-foreground text-sm font-medium">
                  {fact.title}
                </dt>
                <dd className="text-fd-muted-foreground mt-0.5 text-sm leading-relaxed">
                  {fact.body}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </SectionContent>
  </Section>
);

/**
 * Closing call to action.
 *
 * @returns The section element.
 */
export const Cta = () => (
  <Section className="grid-paper">
    <SectionContent className="flex flex-col items-center text-center">
      <SectionTitle>Point the webhook at it.</SectionTitle>
      <p className="text-fd-muted-foreground mt-3 max-w-md text-base leading-relaxed">
        Run the container, paste the URL into a Vercel webhook, and the next
        deployment shows up where your team is already looking.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          className="bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-flex h-10 items-center gap-2 px-4 text-sm font-medium transition-colors"
          href="/docs/setup/docker"
        >
          Run the container
          <ArrowRightIcon className="size-4" />
        </Link>
        <CopyCommand command="docker pull ghcr.io/versend/versend" />
      </div>
    </SectionContent>
  </Section>
);
