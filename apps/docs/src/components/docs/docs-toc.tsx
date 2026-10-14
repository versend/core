"use client";

import * as Primitive from "fumadocs-core/toc";
import { useTOCItems } from "fumadocs-ui/components/toc";
import { ArrowUpIcon, TextIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

const depthPadding = (depth: number) => {
  if (depth <= 2) {
    return "ps-3.5";
  }
  if (depth === 3) {
    return "ps-6";
  }
  return "ps-8";
};

/**
 * Moves the rail indicator to cover the currently visible headings. Offsets
 * are relative to the rail (its `offsetParent`), so they stay valid while the
 * rail scrolls. Values are written as CSS variables so the segment animates
 * in CSS.
 *
 * @param rail - Scrollable list that draws the rail and indicator.
 * @param anchors - Heading ids that are currently in view.
 */
const positionIndicator = (rail: HTMLElement, anchors: string[]) => {
  const links = anchors
    .map((id) => rail.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`))
    .filter((link) => link !== null)
    .toSorted((a, b) => a.offsetTop - b.offsetTop);
  const first = links.at(0);
  const last = links.at(-1);

  if (!(first && last)) {
    rail.style.setProperty("--toc-indicator-opacity", "0");
    return;
  }

  const top = first.offsetTop;
  const bottom = last.offsetTop + last.offsetHeight;

  rail.style.setProperty("--toc-indicator-top", `${top}px`);
  rail.style.setProperty("--toc-indicator-height", `${bottom - top}px`);
  rail.style.setProperty("--toc-indicator-opacity", "1");
};

const TocItems = () => {
  const items = useTOCItems();
  const activeAnchors = Primitive.useActiveAnchors();
  const scrollRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const update = () => positionIndicator(rail, activeAnchors);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [activeAnchors]);

  return (
    <Primitive.ScrollProvider containerRef={scrollRef}>
      <div
        className="min-h-0 overflow-y-auto overscroll-contain"
        ref={scrollRef}
      >
        <div
          className="docs-toc-rail border-fd-border relative flex flex-col border-s py-0.5"
          ref={railRef}
        >
          {items.map((item) => (
            <Primitive.TOCItem
              className={cn(
                "text-fd-muted-foreground hover:text-fd-foreground data-[active=true]:text-fd-foreground block py-1 text-sm leading-snug transition-colors",
                depthPadding(item.depth)
              )}
              href={item.url}
              key={item.url}
            >
              {item.title}
            </Primitive.TOCItem>
          ))}
        </div>
      </div>
    </Primitive.ScrollProvider>
  );
};

/**
 * Sticky table of contents for the right-hand column. Hidden below `xl`;
 * the matching `.docs-toc-marker` lets the layout reserve the column.
 *
 * @param props - Optional footer slot.
 * @returns The TOC element.
 */
export const DocsToc = ({ footer }: { footer?: ReactNode }) => {
  const items = useTOCItems();

  if (items.length === 0 && !footer) {
    return null;
  }

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
