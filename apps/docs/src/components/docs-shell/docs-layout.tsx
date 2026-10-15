"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { DesktopSidebar } from "./desktop-sidebar";
import { MobileDrawer } from "./mobile-drawer";
import { MobileHeader } from "./mobile-header";
import { SidebarIsland } from "./sidebar-island";
import { useSidebarShortcut } from "./use-sidebar-shortcut";

/**
 * Docs shell: collapsible sidebar, floating controls when collapsed, and a
 * drawer on small screens. The main column and TOC are rendered by the page.
 *
 * @param props - Page tree and the page content.
 * @returns The layout element.
 */
export const DocsLayout = ({
  children,
  tree,
}: {
  children: ReactNode;
  tree: PageTree.Root;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Column transitions are off until the first toggle so the initial paint
  // does not animate.
  const [animateColumns, setAnimateColumns] = useState(false);
  const { setOpenSearch } = useSearchContext();

  const setSidebar = useCallback((open: boolean) => {
    setAnimateColumns(true);
    setSidebarOpen(open);
  }, []);
  const toggleSidebar = useCallback(() => {
    setAnimateColumns(true);
    setSidebarOpen((current) => !current);
  }, []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openSearch = () => setOpenSearch(true);

  useSidebarShortcut(toggleSidebar);

  return (
    <TreeContextProvider tree={tree}>
      <div
        data-sidebar={sidebarOpen ? "open" : "closed"}
        data-sidebar-transition={animateColumns}
        id="nd-docs-layout"
      >
        <DesktopSidebar
          onCollapse={() => setSidebar(false)}
          open={sidebarOpen}
          tree={tree}
        />
        <SidebarIsland
          onOpen={() => setSidebar(true)}
          onSearch={openSearch}
          visible={!sidebarOpen}
        />
        <MobileHeader
          onOpenMenu={() => setDrawerOpen(true)}
          onSearch={openSearch}
        />
        <MobileDrawer onClose={closeDrawer} open={drawerOpen} tree={tree} />
        {children}
      </div>
    </TreeContextProvider>
  );
};
