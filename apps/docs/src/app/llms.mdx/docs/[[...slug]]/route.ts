import { notFound } from "next/navigation";

import { getPageMarkdownUrl } from "@/lib/routes";
import { docsLlms, source } from "@/lib/source";

export const revalidate = false;

/**
 * Serves the generated document.
 *
 * @param _req - Incoming request.
 * @param params - Route params.
 * @returns The result.
 */
export const GET = async (
  _req: Request,
  { params }: RouteContext<"/llms.mdx/docs/[[...slug]]">
) => {
  const { slug } = await params;
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) {
    notFound();
  }

  return new Response(await docsLlms.page(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
};

/**
 * Lists the static paths for this route.
 *
 * @returns The result.
 */
export const generateStaticParams = () =>
  source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }));
