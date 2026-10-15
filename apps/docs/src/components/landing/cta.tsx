import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { CopyCommand } from "@/components/ui/copy-command";
import { pullCommand } from "@/lib/site";

import { Section, SectionContent, SectionTitle } from "./section";

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
        <CopyCommand command={pullCommand} />
      </div>
    </SectionContent>
  </Section>
);
