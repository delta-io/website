module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "airbnb/hooks", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "react/function-component-definition": [
      1,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "function-expression",
      },
    ],
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["config", "./config"],
          ["src", "./src"],
        ],
        extensions: [".js", ".jsx", ".mdx"],
      },
    },
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "src/**",
            group: "external",
            position: "after",
          },
        ],
      },
    ],
  },
};
