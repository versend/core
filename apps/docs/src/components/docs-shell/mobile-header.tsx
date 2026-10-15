"use client";

import { MenuIcon, SearchIcon } from "lucide-react";

import { Brand } from "@/components/site/brand";
import { IconButton } from "@/components/ui/icon-button";

/**
 * Fixed top bar below `md` with search and the drawer trigger.
 *
 * @param props - Menu and search callbacks.
 * @returns The header element.
 */
export const MobileHeader = ({
  onOpenMenu,
  onSearch,
}: {
  onOpenMenu: () => void;
  onSearch: () => void;
}) => (
  <header className="border-fd-border bg-fd-background/90 fixed inset-x-0 top-0 z-30 flex h-12 items-center justify-between border-b px-2.5 backdrop-blur md:hidden">
    <Brand />
    <div className="flex items-center gap-0.5">
      <IconButton label="Search" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
      <IconButton label="Open navigation" onClick={onOpenMenu}>
        <MenuIcon />
      </IconButton>
    </div>
  </header>
);
