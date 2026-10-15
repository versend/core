export const appName = "Versend";
export const siteDescription =
  "Vercel events delivered to the destinations you configure.";

const repository = {
  branch: "master",
  name: "core",
  owner: "versend",
} as const;

export const repositoryUrl = `https://github.com/${repository.owner}/${repository.name}`;

export const dockerImage = "ghcr.io/versend/versend";
export const pullCommand = `docker pull ${dockerImage}`;

const docsContentDir = "apps/docs/content/docs";

/**
 * GitHub URL of a docs page's MDX source.
 *
 * @param pagePath - Page path relative to the content directory.
 * @returns The result.
 */
export const pageSourceUrl = (pagePath: string) =>
  `${repositoryUrl}/blob/${repository.branch}/${docsContentDir}/${pagePath}`;
