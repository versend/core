const dropHighlightPseudo = () => ({
  Rule(rule) {
    if (rule.selector.includes("::highlight(")) {
      rule.remove();
    }
  },
  postcssPlugin: "drop-highlight-pseudo",
});

dropHighlightPseudo.postcss = true;

const config = {
  plugins: ["@tailwindcss/postcss", dropHighlightPseudo()],
};

export default config;
