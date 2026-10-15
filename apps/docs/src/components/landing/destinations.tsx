import {
  ArrowRightIcon,
  BellIcon,
  HashIcon,
  MessageSquareIcon,
  SendIcon,
  SmartphoneIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

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
