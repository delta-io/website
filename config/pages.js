const path = require("path");

const mdxPageTypes = [
  {
    name: "pages",
    path: "src/pages",
  },
  {
    name: "blog",
    path: "src/blog",
    template: "blog",
    perPage: 12,
    featuredCount: 1,
  },
  {
    name: "user-stories",
    path: "src/user-stories",
    template: "user-stories",
    perPage: 12,
    featuredCount: 1,
  },
];

const mdxTemplatesBasePath = path.resolve("./src/templates/mdx");
const collectionTemplatesBasePath = path.resolve("./src/templates/collections");

module.exports = {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
};
