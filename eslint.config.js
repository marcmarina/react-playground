import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Copied from https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins prefixed with `node:`.
            ["^node:"],
            // React
            ["^react"],

            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],

            [
              "assets",
              "components",
              "config",
              "http",
              "models",
              "pages",
              "utils",
            ],

            // Relative imports.
            ["^\\.\\."],
            ["^\\."],
          ],
        },
      ],
    },
  },
];
