import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Numbered vertical step list. Each child should be a {@link Step}.
 *
 * @param props - Container props.
 * @returns The steps element.
 */
export const Steps = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "border-fd-border relative my-6 ms-3 border-s ps-7 [counter-reset:step]",
      className
    )}
    {...props}
  />
);

/**
 * A single step inside {@link Steps}. The marker is drawn with a pseudo
 * element so authors only write the step body.
 *
 * @param props - Step props.
 * @returns The step element.
 */
export const Step = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "relative pb-7 [counter-increment:step] last:pb-0 [&>:first-child]:mt-0",
      "before:border-fd-border before:bg-fd-background before:text-fd-muted-foreground before:text-2xs before:absolute before:-start-10.25 before:top-0.5 before:flex before:size-6.5 before:items-center before:justify-center before:rounded-full before:border before:font-mono before:font-medium before:content-[counter(step)]",
      className
    )}
    {...props}
  />
);
