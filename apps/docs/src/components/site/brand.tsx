import Link from "next/link";

import { cn } from "@/lib/cn";
import { appName } from "@/lib/shared";

/**
 * Wordmark link that points back to the landing page.
 *
 * @param props - Optional class name.
 * @returns The brand link.
 */
export const Brand = ({ className }: { className?: string }) => (
  <Link
    className={cn(
      "text-fd-foreground inline-flex h-7 items-center gap-2 rounded-md px-2 text-sm font-semibold tracking-tight",
      className
    )}
    href="/"
  >
    <span
      aria-hidden
      className="bg-fd-foreground text-fd-background text-2xs inline-flex size-4 items-center justify-center rounded-sm font-mono leading-none"
    >
      v
    </span>
    {appName}
  </Link>
);
