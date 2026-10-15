"use client";

import { PanelLeftIcon, SearchIcon } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

/**
 * Floating controls shown while the desktop sidebar is collapsed.
 *
 * @param props - Visibility and the open/search callbacks.
 * @returns The island element.
 */
export const SidebarIsland = ({
  onOpen,
  onSearch,
  visible,
}: {
  onOpen: () => void;
  onSearch: () => void;
  visible: boolean;
}) => (
  <div
    aria-hidden={!visible}
    className={cn(
      "border-fd-border bg-fd-background/90 fixed top-3 left-3 z-30 hidden items-center gap-0.5 rounded-sm border p-0.5 backdrop-blur md:flex",
      "transition-all duration-200 ease-out",
      visible
        ? "opacity-100 delay-150"
        : "pointer-events-none -translate-x-1 scale-95 opacity-0"
    )}
    inert={!visible}
  >
    <IconButton label="Show sidebar (⌘B)" onClick={onOpen}>
      <PanelLeftIcon />
    </IconButton>
    <IconButton label="Search (⌘K)" onClick={onSearch}>
      <SearchIcon />
    </IconButton>
  </div>
);
