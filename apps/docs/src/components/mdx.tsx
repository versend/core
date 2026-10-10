import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

/**
 * Merges Fumadocs MDX components with local overrides.
 *
 * @param components - MDX component overrides.
 * @returns The result.
 */
export const getMDXComponents = (components?: MDXComponents) =>
  ({
    ...defaultMdxComponents,
    ...components,
  }) satisfies MDXComponents;

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
