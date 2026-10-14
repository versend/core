import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Keyboard key chip.
 *
 * @param props - Element props.
 * @returns The kbd element.
 */
export const Kbd = ({ className, ...props }: ComponentProps<"kbd">) => (
  <kbd
    className={cn(
      "border-fd-border bg-fd-background text-fd-muted-foreground text-2xs inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-sm border px-1 font-mono leading-none",
      className
    )}
    {...props}
  />
);
