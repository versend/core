"use client";

import { getBreadcrumbItemsFromPath } from "fumadocs-core/breadcrumb";
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useMemo } from "react";

import { docsRoute } from "@/lib/routes";

/**
 * Folder trail above the page title. The root is always included so every
 * page has a breadcrumb row and the title sits at the same height.
 *
 * @returns The breadcrumb element.
 */
export const Breadcrumb = () => {
  const path = useTreePath();
  const { root } = useTreeContext();
  const items = useMemo(
    () => [
      { name: "Docs", url: docsRoute },
      ...getBreadcrumbItemsFromPath(root, path, { includePage: false }),
    ],
    [path, root]
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-fd-muted-foreground mb-3 flex items-center gap-1 text-sm"
    >
      {items.map((item, position) => {
        const key = item.url ?? `crumb-${position}`;

        return (
          <Fragment key={key}>
            {position > 0 ? (
              <ChevronRightIcon className="size-3.5 shrink-0" />
            ) : null}
            {item.url ? (
              <Link
                className="hover:text-fd-foreground truncate transition-colors"
                href={item.url}
              >
                {item.name}
              </Link>
            ) : (
              <span className="truncate">{item.name}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
