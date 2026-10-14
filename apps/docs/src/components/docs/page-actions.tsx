"use client";

import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { CheckIcon, CopyIcon, PencilLineIcon } from "lucide-react";

import { cn } from "@/lib/cn";

const actionClassName =
  "border-fd-border bg-fd-card text-fd-muted-foreground hover:bg-fd-accent/60 hover:text-fd-foreground focus-visible:ring-fd-ring inline-flex h-7 items-center gap-1.5 rounded-md border px-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none [&_svg]:size-3.5";

/**
 * Copies the page's Markdown source to the clipboard.
 *
 * @param props - URL of the Markdown representation.
 * @returns The button element.
 */
export const CopyMarkdownButton = ({
  markdownUrl,
}: {
  markdownUrl: string;
}) => {
  const [copied, onCopy] = useCopyButton(async () => {
    const response = await fetch(markdownUrl);
    await navigator.clipboard.writeText(await response.text());
  });

  return (
    <button className={actionClassName} onClick={onCopy} type="button">
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied" : "Copy as Markdown"}
    </button>
  );
};

/**
 * Link to the page source on GitHub.
 *
 * @param props - Source URL and optional class name.
 * @returns The anchor element.
 */
export const EditOnGitHub = ({
  className,
  href,
}: {
  className?: string;
  href: string;
}) => (
  <a
    className={cn(actionClassName, className)}
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    <PencilLineIcon />
    Edit on GitHub
  </a>
);
