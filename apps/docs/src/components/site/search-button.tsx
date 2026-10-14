"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/cn";

import { Kbd } from "./kbd";

/**
 * Opens the Fumadocs search dialog. Styled as an input so it reads as a
 * search field inside the sidebar.
 *
 * @param props - Optional class name.
 * @returns The trigger button.
 */
export const SearchButton = ({ className }: { className?: string }) => {
  const { enabled, setOpenSearch } = useSearchContext();

  if (!enabled) {
    return null;
  }

  return (
    <button
      className={cn(
        "border-fd-border bg-fd-card text-fd-muted-foreground hover:bg-fd-accent/60 hover:text-fd-foreground focus-visible:ring-fd-ring inline-flex h-8 items-center gap-2 rounded-md border px-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      onClick={() => setOpenSearch(true)}
      type="button"
    >
      <SearchIcon className="size-3.5 shrink-0" />
      <span className="flex-1 text-left">Search</span>
      <span className="inline-flex items-center gap-0.5">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
};
