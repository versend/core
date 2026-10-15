import { createGetUrl } from "fumadocs-core/source";

export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

interface PageLocation {
  slugs: string[];
  locale?: string;
}

const getContentUrl = createGetUrl(docsContentRoute);
const getImageUrl = createGetUrl(docsImageRoute);

/**
 * Builds the markdown path for a page.
 *
 * @param page - Docs page.
 * @returns The result.
 */
export const getPageMarkdownUrl = (page: PageLocation) => {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
};

/**
 * Builds the Open Graph image path for a page.
 *
 * @param page - Docs page.
 * @returns The result.
 */
export const getPageImageUrl = (page: PageLocation) => {
  const segments = [...page.slugs, "image.webp"];

  return { segments, url: getImageUrl(segments, page.locale) };
};
