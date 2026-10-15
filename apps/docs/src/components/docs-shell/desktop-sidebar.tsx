"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { PanelLeftIcon } from "lucide-react";

import { Brand } from "@/components/site/brand";
import { SearchButton } from "@/components/site/search-button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

import { SidebarFooter } from "./sidebar-footer";
import { SidebarNav } from "./sidebar-nav";

/**
 * Sticky sidebar for `md` and up. Collapses in place; the island takes over.
 *
 * @param props - Open state, collapse callback and the page tree.
 * @returns The sidebar element.
 */
export const DesktopSidebar = ({
  onCollapse,
  open,
  tree,
}: {
  onCollapse: () => void;
  open: boolean;
  tree: PageTree.Root;
}) => (
  <div className="hidden [grid-area:sidebar] md:block">
    <aside
      aria-hidden={!open}
      className={cn(
        "border-fd-border bg-fd-background sticky top-0 flex h-dvh w-(--docs-sidebar-width) flex-col border-x",
        "transition-all duration-200 ease-out",
        !open && "pointer-events-none -translate-x-2 opacity-0"
      )}
      inert={!open}
    >
      <div className="flex h-12 items-center justify-between px-2.5">
        <Brand />
        <IconButton label="Hide sidebar (⌘B)" onClick={onCollapse}>
          <PanelLeftIcon />
        </IconButton>
      </div>
      <div className="px-2.5 pb-1">
        <SearchButton className="w-full" />
      </div>
      <SidebarNav tree={tree} />
      <SidebarFooter />
    </aside>
  </div>
);
