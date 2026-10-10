import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import next from "ultracite/oxlint/next";
import nextJsPlugins from "ultracite/oxlint/next/js-plugins";
import react from "ultracite/oxlint/react";
import shadcn from "ultracite/oxlint/shadcn";
import vitest from "ultracite/oxlint/vitest";

const jsPlugins = selectJsPlugins([
  "github",
  "jsdoc-js",
  "tsdoc",
  "react-doctor",
]);

export default defineConfig({
  extends: [
    core,
    react,
    next,
    vitest,
    nextJsPlugins,
    shadcn,
    antiSlop,
    jsPlugins,
  ],
  ignorePatterns: core.ignorePatterns,
  jsPlugins: [...jsPlugins.jsPlugins, ...shadcn.jsPlugins],
  overrides: [
    {
      files: ["apps/docs/src/app/search-highlight.tsx"],
      rules: {
        // ::highlight() is not a LightningCSS pseudo. The rule has to ship as raw CSS.
        "shadcn/no-inline-styles": "off",
      },
    },
  ],
  settings: jsPluginSettings,
});
