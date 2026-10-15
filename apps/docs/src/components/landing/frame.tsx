import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const cornerClassName =
  "border-fd-foreground/50 absolute size-2 border-0 border-solid";

/**
 * Four small pen marks at the corners of a panel, drawn outside its border.
 *
 * @returns The corner marks.
 */
export const FrameCorners = () => (
  <div aria-hidden className="pointer-events-none absolute -inset-px z-10">
    <span className={cn(cornerClassName, "top-0 left-0 border-t border-l")} />
    <span className={cn(cornerClassName, "top-0 right-0 border-t border-r")} />
    <span
      className={cn(cornerClassName, "bottom-0 left-0 border-b border-l")}
    />
    <span
      className={cn(cornerClassName, "right-0 bottom-0 border-r border-b")}
    />
  </div>
);

/**
 * Bordered panel with corner marks. Use for anything that should read as a
 * drawn box on the page.
 *
 * @param props - Panel props.
 * @returns The panel element.
 */
export const Frame = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("border-fd-border bg-fd-card relative border", className)}
    {...props}
  >
    <FrameCorners />
    {children}
  </div>
);

/**
 * Thin header strip for a {@link Frame}, with a mono label.
 *
 * @param props - Header props.
 * @returns The header element.
 */
export const FrameHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "border-fd-border text-fd-muted-foreground text-2xs flex h-9 items-center justify-between gap-3 border-b px-3 font-mono tracking-wider uppercase",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
