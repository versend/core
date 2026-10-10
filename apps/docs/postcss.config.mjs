function dropHighlightPseudo() {
  return {
    postcssPlugin: "drop-highlight-pseudo",
    Rule(rule) {
      if (rule.selector.includes("::highlight(")) {
        rule.remove();
      }
    },
  };
}

dropHighlightPseudo.postcss = true;

const config = {
  plugins: ["@tailwindcss/postcss", dropHighlightPseudo()],
};

export default config;
