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
  },
];

const mdxTemplatesBasePath = path.resolve("./src/templates/mdx");
const collectionTemplatesBasePath = path.resolve("./src/templates/collections");

module.exports = {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
};
