/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es5: true,
    node: true,
    commonjs: true,
  },
  extends: [
    "eslint",
    "prettier",
    "prettier/react",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
    "react/prop-types": "off",
    "react/display-name": "off",
    semi: ["error", "always"],
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "next" }],
    "import/prefer-default-export": "off",
    "no-console": ["warn", { allow: ["tron"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "keyword-spacing": "true",
  },
};
