import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      "coverage",
      "**/public",
      "**/dist",
      "**/.astro",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  importPlugin.flatConfigs.recommended,
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",
      "import/order": ["error"],
    },
  },
];
