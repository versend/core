"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import {
  BotIcon,
  ExternalLinkIcon,
  MenuIcon,
  PanelLeftIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import { Brand } from "@/components/site/brand";
import { GitHubIcon } from "@/components/site/github-icon";
import { IconButton, IconLink } from "@/components/site/icon-button";
import { SearchButton } from "@/components/site/search-button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/cn";
import { gitConfig } from "@/lib/shared";

import { DocsSidebarNav } from "./docs-sidebar";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const llmLinks = [
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/llms-full.txt", label: "llms-full.txt" },
] as const;

const LlmsMenu = () => (
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

const SidebarFooter = () => (
  <div className="flex items-center justify-between px-2.5 pt-1 pb-2.5">
    <div className="flex items-center gap-0.5">
      <LlmsMenu />
      <IconLink
        href={githubUrl}
        label="GitHub repository"
        rel="noreferrer"
        target="_blank"
      >
        <GitHubIcon />
      </IconLink>
    </div>
    <ThemeToggle />
  </div>
);

const DesktopSidebar = ({
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
      <DocsSidebarNav tree={tree} />
      <SidebarFooter />
    </aside>
  </div>
);

const SidebarIsland = ({
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

const MobileHeader = ({
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

/**
 * Navigation drawer for small screens, built on the native `<dialog>` so
 * focus trapping, Escape handling and the backdrop come for free.
 *
 * @param props - Open state, close callback and the page tree.
 * @returns The dialog element.
 */
const MobileDrawer = ({
  onClose,
  open,
  tree,
}: {
  onClose: () => void;
  open: boolean;
  tree: PageTree.Root;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onBackdropClick = useEffectEvent((event: MouseEvent) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    // Clicks that land on the dialog itself (not its children) hit the backdrop.
    const listener = (event: MouseEvent) => onBackdropClick(event);
    dialog.addEventListener("click", listener);
    return () => dialog.removeEventListener("click", listener);
  }, []);

  return (
    <dialog
      aria-label="Documentation navigation"
      className={cn(
        "border-fd-border bg-fd-background text-fd-foreground fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-72 max-w-full flex-col border-r p-0 open:flex md:hidden",
        "backdrop:bg-fd-overlay",
        "transition-transform duration-200 ease-out starting:open:-translate-x-full"
      )}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="border-fd-border flex h-12 shrink-0 items-center justify-between border-b px-2.5">
        <Brand />
        <IconButton label="Close navigation" onClick={onClose}>
          <XIcon />
        </IconButton>
      </div>
      <DocsSidebarNav onNavigate={onClose} tree={tree} />
      <SidebarFooter />
    </dialog>
  );
};

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName));

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
  const [animateColumns, setAnimateColumns] = useState(false);
  const { setOpenSearch } = useSearchContext();
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "b" &&
        !isTypingTarget(event.target)
      ) {
        event.preventDefault();
        setAnimateColumns(true);
        setSidebarOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleSidebar = (open: boolean) => {
    setAnimateColumns(true);
    setSidebarOpen(open);
  };

  return (
    <TreeContextProvider tree={tree}>
      <div
        data-sidebar={sidebarOpen ? "open" : "closed"}
        data-sidebar-transition={animateColumns}
        id="nd-docs-layout"
      >
        <DesktopSidebar
          onCollapse={() => toggleSidebar(false)}
          open={sidebarOpen}
          tree={tree}
        />
        <SidebarIsland
          onOpen={() => toggleSidebar(true)}
          onSearch={() => setOpenSearch(true)}
          visible={!sidebarOpen}
        />
        <MobileHeader
          onOpenMenu={() => setDrawerOpen(true)}
          onSearch={() => setOpenSearch(true)}
        />
        <MobileDrawer onClose={closeDrawer} open={drawerOpen} tree={tree} />
        {children}
      </div>
    </TreeContextProvider>
  );
};
