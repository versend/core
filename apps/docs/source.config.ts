import { defineConfig } from "fumadocs-mdx/config";

import { shikiThemes } from "./src/lib/shiki";

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      defaultColor: false,
      themes: shikiThemes,
    },
  },
});
