import { DynamicLink } from "fumadocs-core/dynamic-link";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DynamicLink,
    ...components,
  };
}
