module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off",
    semi: ["false"],
    "prettier/prettier": [{ semi: false }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // External packages come first
          ["^@?\\w"],
          // Internal files
          ["^@/"],
          // Colocated files
          ["^\\.\\./", "^\\./"],
          // Style imports
          ["^.+\\.?(css)$"],
        ],
      },
    ],
  },
}
