import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export const iconButtonClassName =
  "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4";

/** Props for {@link IconButton}. */
export type IconButtonProps = Omit<ComponentProps<"button">, "type"> & {
  /** Accessible name; icon-only buttons have no visible text. */
  label: string;
};

/**
 * Square ghost button used across the docs chrome.
 *
 * @param props - Button props plus an accessible label.
 * @returns The button element.
 */
export const IconButton = ({ className, label, ...props }: IconButtonProps) => (
  <button
    aria-label={label}
    className={cn(iconButtonClassName, className)}
    type="button"
    {...props}
  />
);

/** Props for {@link IconLink}. */
export type IconLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  /** Accessible name; icon-only links have no visible text. */
  label: string;
};

/**
 * Anchor styled like {@link IconButton}.
 *
 * @param props - Anchor props plus an accessible label.
 * @returns The anchor element.
 */
export const IconLink = ({
  className,
  href,
  label,
  ...props
}: IconLinkProps) => (
  <a
    aria-label={label}
    className={cn(iconButtonClassName, className)}
    href={href}
    {...props}
  />
);
