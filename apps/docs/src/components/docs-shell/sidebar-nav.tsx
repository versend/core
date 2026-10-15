"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { usePathname } from "next/navigation";

import { SectionLabel, SidebarNode } from "./sidebar-items";
import { nodeKey, toSections } from "./sidebar-sections";

/**
 * Scrollable navigation tree shared by the desktop sidebar and mobile drawer.
 *
 * @param props - Page tree and an optional navigation callback.
 * @returns The navigation element.
 */
export const SidebarNav = ({
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
