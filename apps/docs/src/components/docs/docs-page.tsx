"use client";

import { getBreadcrumbItemsFromPath } from "fumadocs-core/breadcrumb";
import type * as PageTree from "fumadocs-core/page-tree";
import type { TableOfContents } from "fumadocs-core/toc";
import { TOCProvider } from "fumadocs-ui/components/toc";
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree";
import { useFooterItems } from "fumadocs-ui/utils/use-footer-items";
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { Fragment, useMemo } from "react";

import { cn } from "@/lib/cn";
import { docsRoute } from "@/lib/shared";

import { DocsToc } from "./docs-toc";

const emptyToc: TableOfContents = [];

const Breadcrumb = () => {
  const path = useTreePath();
  const { root } = useTreeContext();
  // The root is always included so every page has a breadcrumb row and the
  // title sits at the same height across the site.
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

const FooterLink = ({
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

const PageFooter = () => {
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
        <FooterLink direction="previous" item={previous} />
      ) : (
        <span />
      )}
      {next ? <FooterLink direction="next" item={next} /> : null}
    </nav>
  );
};

/**
 * Main article column plus the sticky table of contents.
 *
 * @param props - Page content, TOC entries and layout flags.
 * @returns The page element.
 */
export const DocsPage = ({
  children,
  className,
  full = false,
  toc = emptyToc,
  tocFooter,
  ...props
}: ComponentProps<"article"> & {
  full?: boolean;
  toc?: TableOfContents;
  tocFooter?: ReactNode;
}) => (
  <TOCProvider toc={toc}>
    <article
      className={cn(
        "mx-auto flex w-full flex-col px-5 pt-8 pb-24 [grid-area:main] sm:px-8 md:pt-14",
        full ? "max-w-6xl" : "max-w-3xl",
        className
      )}
      id="nd-page"
      {...props}
    >
      <Breadcrumb />
      {children}
      <PageFooter />
    </article>
    <DocsToc footer={tocFooter} />
  </TOCProvider>
);

/**
 * Page heading.
 *
 * @param props - Heading props.
 * @returns The h1 element.
 */
export const DocsTitle = ({
  children,
  className,
  ...props
}: ComponentProps<"h1">) => (
  <h1
    className={cn(
      "text-fd-foreground scroll-m-20 text-3xl font-semibold tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

/**
 * Page lede shown under the title.
 *
 * @param props - Paragraph props.
 * @returns The paragraph, or nothing without content.
 */
export const DocsDescription = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  if (children === undefined || children === null) {
    return null;
  }

  return (
    <p
      className={cn("text-fd-muted-foreground mt-2 text-base", className)}
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * Prose container for MDX content.
 *
 * @param props - Container props.
 * @returns The body element.
 */
export const DocsBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("prose docs-body text-md mt-8 w-full max-w-none", className)}
    {...props}
  />
);
