import { ThemeToggle } from "@/components/site/theme-toggle";
import { GitHubIcon } from "@/components/ui/github-icon";
import { IconLink } from "@/components/ui/icon-button";
import { repositoryUrl } from "@/lib/site";

import { LlmsMenu } from "./llms-menu";

/**
 * Bottom strip of the sidebar and drawer: agent exports, repository, theme.
 *
 * @returns The footer element.
 */
export const SidebarFooter = () => (
  <div className="flex items-center justify-between px-2.5 pt-1 pb-2.5">
    <div className="flex items-center gap-0.5">
      <LlmsMenu />
      <IconLink
        href={repositoryUrl}
        label="GitHub repository"
        rel="noreferrer"
        target="_blank"
      >
        <GitHubIcon />
      </IconLink>
    </div>
    <ThemeToggle />
  </div>
);
