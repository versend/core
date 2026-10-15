import type * as PageTree from "fumadocs-core/page-tree";
import type { ReactNode } from "react";

/**
 * A labelled group of sidebar entries.
 */
export interface SidebarSection {
  key: string;
  label?: ReactNode;
  /** Page the section label links to, when the folder has an index page. */
  index?: PageTree.Item;
  nodes: PageTree.Node[];
}

/**
 * Stable React key for a tree node.
 *
 * @param node - Tree node.
 * @param fallback - Key when the node has neither an id nor a URL.
 * @returns The key.
 */
export const nodeKey = (node: PageTree.Node, fallback: string) =>
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
export const splitFolder = (folder: PageTree.Folder) => {
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
export const toSections = (nodes: PageTree.Node[]): SidebarSection[] => {
  const sections: SidebarSection[] = [];
  let current: SidebarSection | undefined;

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
