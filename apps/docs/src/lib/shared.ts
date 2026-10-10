import { createGetUrl } from "fumadocs-core/source";

export const appName = "Versend";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  branch: "main",
  repo: "core",
  user: "versend",
};

const getContentUrl = createGetUrl(docsContentRoute);

/**
 * Builds the markdown path for a page.
 *
 * @param page - Docs page.
 * @returns The result.
 */
export const getPageMarkdownUrl = (page: {
  slugs: string[];
  locale?: string;
}) => {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
};

const getImageUrl = createGetUrl(docsImageRoute);

/**
 * Builds the Open Graph image path for a page.
 *
 * @param page - Docs page.
 * @returns The result.
 */
export const getPageImageUrl = (page: { slugs: string[]; locale?: string }) => {
  const segments = [...page.slugs, "image.webp"];

  return { segments, url: getImageUrl(segments, page.locale) };
};
