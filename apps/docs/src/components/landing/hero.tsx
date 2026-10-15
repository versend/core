import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { CopyCommand } from "@/components/ui/copy-command";
import { pullCommand } from "@/lib/site";

import { ComposePanel, TerminalPanel } from "./hero-panels";
import { Section, SectionContent } from "./section";

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
            <CopyCommand command={pullCommand} />
          </div>
        </div>

        <div className="grid gap-4">
          <ComposePanel />
          <TerminalPanel />
        </div>
      </div>
    </SectionContent>
  </Section>
);
