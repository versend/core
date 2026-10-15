"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { nodeKey, splitFolder } from "./sidebar-sections";

const labelClassName =
  "flex h-6 items-center px-2 text-2xs font-medium tracking-wider uppercase";

/**
 * Section heading. Links to the folder's index page when it has one.
 *
 * @param props - Label, optional index page, navigation callback and pathname.
 * @returns The label element.
 */
export const SectionLabel = ({
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

/**
 * Renders a page link, a nested folder or a separator.
 *
 * @param props - Tree node, navigation callback and pathname.
 * @returns The node element.
 */
export const SidebarNode = ({
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
