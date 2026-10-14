import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { Card, Cards } from "./content/card";
import { createHeading } from "./content/heading";
import { Step, Steps } from "./content/steps";

/**
 * Merges Fumadocs MDX components with local overrides.
 *
 * @param components - MDX component overrides.
 * @returns The result.
 */
export const getMDXComponents = (components?: MDXComponents) =>
  ({
    ...defaultMdxComponents,
    Card,
    Cards,
    Step,
    Steps,
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    h5: createHeading("h5"),
    h6: createHeading("h6"),
    ...components,
  }) satisfies MDXComponents;

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
