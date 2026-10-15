"use client";

import { useTOCItems } from "fumadocs-ui/components/toc";
import { ArrowUpIcon, TextIcon } from "lucide-react";
import type { ReactNode } from "react";

import { TocItems } from "./toc-items";

/**
 * Sticky table of contents for the right-hand column. Hidden below `xl`.
 * The column is always rendered, even without headings, so the main column
 * keeps the same width from page to page.
 *
 * @param props - Optional footer slot.
 * @returns The TOC element.
 */
export const DocsToc = ({ footer }: { footer?: ReactNode }) => {
  const items = useTOCItems();

  return (
    <>
      <div aria-hidden className="docs-toc-marker hidden" />
      <aside
        className="sticky top-0 hidden h-dvh w-(--docs-toc-width) flex-col ps-4 pe-5 pt-13 pb-6 [grid-area:toc] xl:flex"
        id="nd-toc"
      >
        {items.length > 0 ? (
          <>
            <p className="text-fd-muted-foreground mb-2 inline-flex items-center gap-1.5 text-xs font-medium">
              <TextIcon className="size-3.5" />
              On this page
            </p>
            <TocItems />
          </>
        ) : null}
        <div className="border-fd-border mt-auto flex flex-col gap-2 border-t pt-3">
          {footer}
          <button
            className="text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
            onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
            type="button"
          >
            <ArrowUpIcon className="size-3.5" />
            Back to top
          </button>
        </div>
      </aside>
    </>
  );
};
