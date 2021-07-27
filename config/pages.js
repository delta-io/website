const path = require("path");

const mdxPageTypes = [
  {
    name: "pages",
    path: "src/pages",
  },
  {
    name: "news",
    path: "src/news",
    template: "news",
    perPage: 10,
  },
];

const mdxTemplatesBasePath = path.resolve("./src/templates/mdx");
const collectionTemplatesBasePath = path.resolve("./src/templates/collections");

module.exports = {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
};
