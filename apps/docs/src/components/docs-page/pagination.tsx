"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { useFooterItems } from "fumadocs-ui/utils/use-footer-items";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

const PaginationLink = ({
  direction,
  item,
}: {
  direction: "next" | "previous";
  item: PageTree.Item;
}) => {
  const isPrevious = direction === "previous";

  return (
    <Link
      className={cn(
        "group border-fd-border bg-fd-card hover:border-fd-ring/50 focus-visible:ring-fd-ring flex min-w-0 flex-col gap-1 rounded-lg border p-3.5 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        !isPrevious && "items-end text-right"
      )}
      href={item.url}
    >
      <span className="text-fd-muted-foreground text-2xs inline-flex items-center gap-1 font-medium tracking-wider uppercase">
        {isPrevious ? <ArrowLeftIcon className="size-3" /> : null}
        {isPrevious ? "Previous" : "Next"}
        {isPrevious ? null : <ArrowRightIcon className="size-3" />}
      </span>
      <span className="text-fd-foreground text-md truncate font-medium">
        {item.name}
      </span>
      {item.description ? (
        <span className="text-fd-muted-foreground line-clamp-2 text-xs">
          {item.description}
        </span>
      ) : null}
    </Link>
  );
};

/**
 * Previous/next page links at the end of an article.
 *
 * @returns The pagination element, or nothing on a lone page.
 */
export const Pagination = () => {
  const pathname = usePathname();
  const items = useFooterItems();
  const position = items.findIndex((item) => item.url === pathname);
  const previous = position > 0 ? items[position - 1] : undefined;
  const next = position === -1 ? undefined : items[position + 1];

  if (!(previous || next)) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="border-fd-border mt-14 grid grid-cols-1 gap-3 border-t pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <PaginationLink direction="previous" item={previous} />
      ) : (
        <span />
      )}
      {next ? <PaginationLink direction="next" item={next} /> : null}
    </nav>
  );
};
