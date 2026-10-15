import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/docs-page/docs-page";
import {
  CopyMarkdownButton,
  EditOnGitHub,
} from "@/components/docs-page/page-actions";
import { getMDXComponents } from "@/components/mdx/components";
import { getPageImageUrl, getPageMarkdownUrl } from "@/lib/routes";
import { pageSourceUrl } from "@/lib/site";
import { source } from "@/lib/source";

const Page = async (props: PageProps<"/docs/[[...slug]]">) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const PageBody = page.data.body;

  return (
    <DocsPage
      full={page.data.full}
      toc={page.data.toc}
      tocFooter={
        <EditOnGitHub className="w-fit" href={pageSourceUrl(page.path)} />
      }
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
        <DocsTitle>{page.data.title}</DocsTitle>
        <div className="shrink-0 md:pt-1.5">
          <CopyMarkdownButton markdownUrl={getPageMarkdownUrl(page).url} />
        </div>
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <PageBody
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

/**
 * Lists the static paths for this route.
 *
 * @returns The result.
 */
export const generateStaticParams = () => source.generateParams();

/**
 * Builds the page title and social image.
 *
 * @param props - Page props.
 * @returns The result.
 */
export const generateMetadata = async (
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  return {
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
    title: page.data.title,
  };
};
