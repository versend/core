"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface Section {
  key: string;
  label?: ReactNode;
  /** Page the section label links to, when the folder has an index page. */
  index?: PageTree.Item;
  nodes: PageTree.Node[];
}

const nodeKey = (node: PageTree.Node, fallback: string) =>
  node.$id ?? (node.type === "page" ? node.url : fallback);

/**
 * Resolves a folder's index page and its remaining children. Fumadocs sets
 * `folder.index` when the index is implicit; when `meta.json` lists `index`
 * explicitly it lands in `children` instead, so fall back to the child that
 * shares the folder's name.
 *
 * @param folder - Folder node.
 * @returns The index page (if any) and the children without it.
 */
const splitFolder = (folder: PageTree.Folder) => {
  const index =
    folder.index ??
    folder.children.find(
      (child): child is PageTree.Item =>
        child.type === "page" && String(child.name) === String(folder.name)
    );
  const children = folder.children.filter((child) => child !== index);

  return { children, index };
};

/**
 * Groups the root of the page tree into labelled sections. Top-level folders
 * become sections; loose pages collect into an unlabelled leading section and
 * explicit separators start a new labelled group.
 *
 * @param nodes - Root children of the page tree.
 * @returns The sections to render.
 */
const toSections = (nodes: PageTree.Node[]): Section[] => {
  const sections: Section[] = [];
  let current: Section | undefined;

  for (const node of nodes) {
    if (node.type === "separator") {
      current = {
        key: nodeKey(node, `separator-${sections.length}`),
        label: node.name,
        nodes: [],
      };
      sections.push(current);
      continue;
    }

    if (node.type === "folder") {
      const { children, index } = splitFolder(node);
      sections.push({
        index,
        key: nodeKey(node, `folder-${sections.length}`),
        label: node.name,
        nodes: children,
      });
      current = undefined;
      continue;
    }

    if (!current) {
      current = { key: nodeKey(node, `pages-${sections.length}`), nodes: [] };
      sections.push(current);
    }

    current.nodes.push(node);
  }

  return sections.filter(
    (section) => section.nodes.length > 0 || section.index !== undefined
  );
};

const labelClassName =
  "flex h-6 items-center px-2 text-2xs font-medium tracking-wider uppercase";

const SectionLabel = ({
  children,
  index,
  onNavigate,
  pathname,
}: {
  children: ReactNode;
  index?: PageTree.Item;
  onNavigate?: () => void;
  pathname: string;
}) => {
  if (!index) {
    return (
      <div className={cn(labelClassName, "text-fd-muted-foreground/80")}>
        <span className="truncate">{children}</span>
      </div>
    );
  }

  const active = pathname === index.url;

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        labelClassName,
        "rounded-md transition-colors",
        active
          ? "text-fd-foreground"
          : "text-fd-muted-foreground/80 hover:text-fd-foreground"
      )}
      href={index.url}
      onClick={onNavigate}
    >
      <span className="truncate">{children}</span>
    </Link>
  );
};

const SidebarLink = ({
  item,
  onNavigate,
  pathname,
}: {
  item: PageTree.Item;
  onNavigate?: () => void;
  pathname: string;
}) => {
  const active = pathname === item.url;

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-7 items-center gap-2 rounded-md px-2 text-sm transition-colors [&_svg]:size-3.5 [&_svg]:shrink-0",
        active
          ? "bg-fd-accent text-fd-accent-foreground font-medium"
          : "text-fd-muted-foreground hover:bg-fd-accent/60 hover:text-fd-foreground"
      )}
      href={item.url}
      onClick={onNavigate}
    >
      {item.icon ? (
        <span className="text-fd-muted-foreground/70 inline-flex">
          {item.icon}
        </span>
      ) : null}
      <span className="truncate">{item.name}</span>
    </Link>
  );
};

const SidebarNode = ({
  node,
  onNavigate,
  pathname,
}: {
  node: PageTree.Node;
  onNavigate?: () => void;
  pathname: string;
}) => {
  if (node.type === "separator") {
    return <SectionLabel pathname={pathname}>{node.name}</SectionLabel>;
  }

  if (node.type === "folder") {
    const { children, index } = splitFolder(node);

    return (
      <div className="mt-2 flex flex-col gap-0.5">
        <SectionLabel index={index} onNavigate={onNavigate} pathname={pathname}>
          {node.name}
        </SectionLabel>
        {children.map((child) => (
          <SidebarNode
            key={nodeKey(child, String(child.name))}
            node={child}
            onNavigate={onNavigate}
            pathname={pathname}
          />
        ))}
      </div>
    );
  }

  return (
    <SidebarLink item={node} onNavigate={onNavigate} pathname={pathname} />
  );
};

/**
 * Scrollable navigation tree shared by the desktop sidebar and mobile drawer.
 *
 * @param props - Page tree and an optional navigation callback.
 * @returns The navigation element.
 */
export const DocsSidebarNav = ({
  onNavigate,
  tree,
}: {
  onNavigate?: () => void;
  tree: PageTree.Root;
}) => {
  const pathname = usePathname();
  const sections = toSections(tree.children);

  return (
    <nav
      aria-label="Documentation"
      className="docs-sidebar-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-2.5 py-3"
    >
      {sections.map((section) => (
        <div className="flex flex-col gap-0.5" key={section.key}>
          {section.label ? (
            <SectionLabel
              index={section.index}
              onNavigate={onNavigate}
              pathname={pathname}
            >
              {section.label}
            </SectionLabel>
          ) : null}
          {section.nodes.map((node) => (
            <SidebarNode
              key={nodeKey(node, String(node.name))}
              node={node}
              onNavigate={onNavigate}
              pathname={pathname}
            />
          ))}
        </div>
      ))}
    </nav>
  );
};
