"use client";

import type { TableOfContents } from "fumadocs-core/toc";
import { TOCProvider } from "fumadocs-ui/components/toc";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Breadcrumb } from "./breadcrumb";
import { DocsToc } from "./docs-toc";
import { Pagination } from "./pagination";

const emptyToc: TableOfContents = [];

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
      <Pagination />
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
