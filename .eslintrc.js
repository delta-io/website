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
  },
};
