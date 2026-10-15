import { generateOGImage } from "fumadocs-ui/og/takumi";
import { notFound } from "next/navigation";

import { appName } from "@/lib/site";
import { source } from "@/lib/source";

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
  { params }: RouteContext<"/og/docs/[...slug]">
) => {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) {
    notFound();
  }

  return generateOGImage({
    description: page.data.description,
    format: "webp",
    site: appName,
    title: page.data.title,
  });
};

/**
 * Lists the static paths for this route.
 *
 * @returns The result.
 */
export const generateStaticParams = () =>
  source.generateParams().map((item) => ({
    ...item,
    slug: [...item.slug, "image.webp"],
  }));
