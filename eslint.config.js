import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs["recommended-latest"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    settings: {
      "jsx-a11y": {
        components: {
          NavLink: "a",
          Link: "a",
        },
      },
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["NavLink", "Link"],
          specialLink: ["to"],
          aspects: ["noHref", "invalidHref"],
        },
      ],
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  }
);
