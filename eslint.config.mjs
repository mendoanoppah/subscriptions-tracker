import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      import: importPlugin,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "import/extensions": [
        "error",
        {
          js: "always",
          mjs: "always",
          cjs: "always",
          ts: "always"
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          extensionss: [".js", ".mjs", ".cjs"],
        },
      },
    },
  },
]);
