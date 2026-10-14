import { defineConfig } from "fumadocs-mdx/config";

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      defaultColor: false,
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
  },
});
