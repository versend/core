import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Centered shell with hairlines running down both sides, so every section
 * reads as one continuous ruled sheet.
 *
 * @param props - Section props.
 * @returns The section element.
 */
export const Section = ({
  children,
  className,
  last = false,
  ...props
}: ComponentProps<"section"> & { last?: boolean }) => (
  <section
    className={cn(
      "border-fd-border relative mx-auto w-full max-w-6xl border-x",
      !last && "border-b",
      className
    )}
    {...props}
  >
    {children}
  </section>
);

/**
 * Padded content area inside a {@link Section}.
 *
 * @param props - Container props.
 * @returns The container element.
 */
export const SectionContent = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("px-5 py-10 sm:px-8 sm:py-12 lg:p-14", className)}
    {...props}
  />
);

/**
 * Small mono eyebrow used above section titles.
 *
 * @param props - Eyebrow text and optional index.
 * @returns The eyebrow element.
 */
export const Eyebrow = ({
  children,
  index,
}: {
  children: ReactNode;
  index?: string;
}) => (
  <p className="text-fd-muted-foreground text-2xs mb-3 flex items-center gap-2 font-mono tracking-wider uppercase">
    {index ? <span className="text-fd-foreground/60">{index}</span> : null}
    <span className="hairline h-px w-4" />
    {children}
  </p>
);

/**
 * Section heading.
 *
 * @param props - Heading props.
 * @returns The heading element.
 */
export const SectionTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2
    className={cn(
      "text-fd-foreground text-2xl font-medium tracking-tight sm:text-3xl",
      className
    )}
  >
    {children}
  </h2>
);
