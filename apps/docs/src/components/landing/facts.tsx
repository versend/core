import {
  ContainerIcon,
  DatabaseZapIcon,
  FilterIcon,
  ShieldCheckIcon,
  TimerIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Eyebrow, Section, SectionContent, SectionTitle } from "./section";

interface Fact {
  Icon: LucideIcon;
  body: string;
  title: string;
}

const facts: Fact[] = [
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
