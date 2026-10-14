"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { gitConfig } from "@/lib/shared";

import { Brand } from "./brand";
import { GitHubIcon } from "./github-icon";
import { IconButton, IconLink } from "./icon-button";
import { ThemeToggle } from "./theme-toggle";

/**
 * Top navigation for marketing pages.
 *
 * @returns The header element.
 */
export const SiteHeader = () => {
  const { enabled, setOpenSearch } = useSearchContext();

  return (
    <header className="border-fd-border bg-fd-background/90 sticky top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-1">
          <Brand />
          <nav
            aria-label="Primary"
            className="ml-2 hidden items-center gap-1 sm:flex"
          >
            <Link
              className="text-fd-muted-foreground hover:text-fd-foreground rounded-md px-2 py-1 text-sm transition-colors"
              href="/docs"
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-0.5">
          {enabled ? (
            <IconButton label="Search (⌘K)" onClick={() => setOpenSearch(true)}>
              <SearchIcon />
            </IconButton>
          ) : null}
          <IconLink
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            label="GitHub repository"
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon />
          </IconLink>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
