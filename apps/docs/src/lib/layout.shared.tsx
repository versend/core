import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { appName, gitConfig } from "./shared";

/**
 * Shared Fumadocs layout options.
 *
 * @returns The result.
 */
export const baseOptions = (): BaseLayoutProps => ({
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  nav: {
    // JSX supported
    title: appName,
  },
});
