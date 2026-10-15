"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Outlined button that copies a shell command to the clipboard.
 *
 * @param props - The command and optional class name.
 * @returns The button element.
 */
export const CopyCommand = ({
  className,
  command,
}: {
  className?: string;
  command: string;
}) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    []
  );

  const copy = useCallback(() => {
    void navigator.clipboard.writeText(command);
    setCopied(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setCopied(false), 1500);
  }, [command]);

  return (
    <button
      aria-label={`Copy ${command}`}
      className={cn(
        "border-fd-border bg-fd-background hover:border-fd-foreground/50 group inline-flex h-10 items-center gap-3 border px-3 text-left font-mono text-sm transition-colors",
        className
      )}
      onClick={copy}
      type="button"
    >
      <span aria-hidden className="text-fd-muted-foreground select-none">
        $
      </span>
      <span className="text-fd-foreground">{command}</span>
      <span className="text-fd-muted-foreground group-hover:text-fd-foreground ms-1 inline-flex size-4 items-center justify-center transition-colors">
        {copied ? (
          <CheckIcon className="text-fd-success size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </span>
    </button>
  );
};
