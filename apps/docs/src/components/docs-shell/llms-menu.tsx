"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { BotIcon, ExternalLinkIcon } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

const llmLinks = [
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/llms-full.txt", label: "llms-full.txt" },
] as const;

/**
 * Popover listing the machine-readable exports of the docs.
 *
 * @returns The menu element.
 */
export const LlmsMenu = () => (
  <Popover>
    <PopoverTrigger render={<IconButton label="Open LLM-friendly files" />}>
      <BotIcon />
    </PopoverTrigger>
    <PopoverContent align="start" className="w-44 p-1" sideOffset={6}>
      <p className="text-fd-muted-foreground text-2xs px-2 pt-1 pb-1.5 font-medium tracking-wider uppercase">
        For agents
      </p>
      {llmLinks.map((link) => (
        <a
          className="text-fd-popover-foreground hover:bg-fd-accent flex h-7 items-center gap-2 rounded-md px-2 font-mono text-xs"
          href={link.href}
          key={link.href}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon className="text-fd-muted-foreground size-3.5" />
          {link.label}
        </a>
      ))}
    </PopoverContent>
  </Popover>
);
