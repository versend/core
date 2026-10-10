import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  deps: {
    alwaysBundle: [/@versend-recode\/.*/],
  },
  entry: "./src/index.ts",
  format: "esm",
  outDir: "./dist",
});
