import Link from "next/link";

import { Brand } from "@/components/site/brand";
import { GitHubIcon } from "@/components/site/github-icon";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { gitConfig } from "@/lib/shared";

import { Section } from "./section";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/setup/docker", label: "Docker" },
  { href: "/docs/setup/webhook", label: "Webhook" },
  { href: "/docs/destinations", label: "Destinations" },
];

/**
 * Landing footer.
 *
 * @returns The footer element.
 */
export const Footer = () => (
  <Section last>
    <footer className="flex flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex items-center gap-4">
        <Brand className="-ms-2" />
        <p className="text-fd-muted-foreground text-2xs font-mono">
          Self-hosted · Bun · Hono
        </p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap items-center gap-1">
        {links.map((link) => (
          <Link
            className="text-fd-muted-foreground hover:text-fd-foreground px-2 py-1 text-sm transition-colors"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
        <a
          aria-label="GitHub repository"
          className="text-fd-muted-foreground hover:text-fd-foreground inline-flex size-8 items-center justify-center transition-colors"
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
          rel="noreferrer"
          target="_blank"
        >
          <GitHubIcon className="size-4" />
        </a>
        <ThemeToggle />
      </nav>
    </footer>
  </Section>
);
