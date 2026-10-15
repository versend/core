import { Link } from "fumadocs-core/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Responsive card grid.
 *
 * @param props - Container props.
 * @returns The grid element.
 */
export const Cards = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "not-prose @container my-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2",
      className
    )}
    {...props}
  />
);

/** Props for {@link Card}. */
export type CardProps = Omit<ComponentProps<"a">, "title"> & {
  description?: ReactNode;
  external?: boolean;
  icon?: ReactNode;
  title: ReactNode;
};

/**
 * Link card used on index pages.
 *
 * @param props - Title, description, icon and link props.
 * @returns The card element.
 */
export const Card = ({
  children,
  className,
  description,
  external,
  href,
  icon,
  title,
  ...props
}: CardProps) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon ? (
            <span className="border-fd-border bg-fd-background text-fd-muted-foreground inline-flex size-6 items-center justify-center rounded-md border [&_svg]:size-3.5">
              {icon}
            </span>
          ) : null}
          <h3 className="text-fd-foreground text-md font-medium">{title}</h3>
        </div>
        {href ? (
          <ArrowUpRightIcon className="text-fd-muted-foreground/60 group-hover/card:text-fd-foreground size-3.5 shrink-0 transition-colors" />
        ) : null}
      </div>
      {description ? (
        <p className="text-fd-muted-foreground mt-1.5 text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
      {children ? (
        <div className="text-fd-muted-foreground mt-1.5 text-sm">
          {children}
        </div>
      ) : null}
    </>
  );
  const cardClassName = cn(
    "group/card border-fd-border bg-fd-card block rounded-lg border p-3.5 transition-colors",
    href &&
      "hover:border-fd-ring/50 hover:bg-fd-accent/40 focus-visible:ring-fd-ring focus-visible:ring-2 focus-visible:outline-none",
    className
  );

  if (!href) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link className={cardClassName} external={external} href={href} {...props}>
      {content}
    </Link>
  );
};
