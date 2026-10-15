"use client";

import * as Primitive from "fumadocs-core/toc";
import { useTOCItems } from "fumadocs-ui/components/toc";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

import { positionTocIndicator } from "./toc-indicator";

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
 * Scrollable heading list with the animated rail indicator.
 *
 * @returns The list element.
 */
export const TocItems = () => {
  const items = useTOCItems();
  const activeAnchors = Primitive.useActiveAnchors();
  const scrollRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const update = () => positionTocIndicator(rail, activeAnchors);
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
