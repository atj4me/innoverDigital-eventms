import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: {  globals: {
    ...globals.browser, // Keep existing browser globals
    process: "readonly", // Add process as a readonly global
  },
},
},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];