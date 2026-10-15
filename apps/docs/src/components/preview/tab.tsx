import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Mono toggle used to pick an event or a destination.
 *
 * @param props - Active state, click handler and label.
 * @returns The button element.
 */
export const Tab = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    aria-pressed={active}
    className={cn(
      "hover:text-fd-foreground inline-flex h-8 items-center gap-2 border px-2.5 font-mono text-xs transition-colors",
      active
        ? "border-fd-foreground/60 bg-fd-background text-fd-foreground"
        : "border-fd-border text-fd-muted-foreground"
    )}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);
