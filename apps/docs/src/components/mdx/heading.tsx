import { LinkIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type HeadingTag = "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Builds a heading component whose text links to its own anchor, with a hover
 * affordance for copying the link.
 *
 * @param Tag - Heading element to render.
 * @returns The heading component.
 */
export const createHeading = (Tag: HeadingTag) => {
  const Heading = ({
    children,
    className,
    id,
    ...props
  }: ComponentProps<HeadingTag>) => {
    if (!id) {
      return (
        <Tag className={className} {...props}>
          {children}
        </Tag>
      );
    }

    return (
      <Tag
        className={cn(
          "group/heading flex scroll-m-24 items-center gap-1.5",
          className
        )}
        id={id}
        {...props}
      >
        <a className="text-inherit no-underline!" href={`#${id}`}>
          {children}
        </a>
        <a
          aria-label="Link to this section"
          className="text-fd-muted-foreground hover:text-fd-foreground not-prose inline-flex size-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100"
          href={`#${id}`}
        >
          <LinkIcon className="size-3.5" />
        </a>
      </Tag>
    );
  };
  Heading.displayName = `Mdx${Tag.toUpperCase()}`;

  return Heading;
};
