const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
} = require("./config/pages");

const getMdxTemplatePath = (templateName = "default") =>
  path.resolve(mdxTemplatesBasePath, `${templateName}.jsx`);

const getCollectionTemplatePath = (templateName = "default") =>
  path.resolve(collectionTemplatesBasePath, `${templateName}.jsx`);

const getPageTypeFromAbsolutePath = (absolutePath) =>
  mdxPageTypes.find(({ path: relativePath }) =>
    absolutePath.includes(`/${relativePath}`)
  );

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const absolutePath = node.fileAbsolutePath;

  if (node.internal.type === "Mdx" && absolutePath) {
    const pageType = getPageTypeFromAbsolutePath(absolutePath);

    const slug = createFilePath({
      node,
      getNode,
      basePath: pageType?.path,
    });

    createNodeField({
      node,
      name: "pageType",
      value: pageType ? pageType.name : "__NONE__",
    });

    createNodeField({
      node,
      name: "slug",
      value: `${
        pageType && pageType.name !== "pages" ? `/${pageType.name}` : ""
      }${slug}`,
    });

    const dateMatches = absolutePath.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatches && dateMatches.length) {
      createNodeField({
        node,
        name: "date",
        value: dateMatches[dateMatches.length - 1],
      });
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const query = `
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              pageType
            }
          }
        }
      }
    }
  `;

  const result = await graphql(query);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const allMdxPages = result.data?.allMdx.edges;

  if (allMdxPages) {
    // Create individual .mdx pages
    allMdxPages
      .filter(({ node }) => node.fields.pageType !== "pages")
      .forEach(({ node }) => {
        if (node.fields.pageType) {
          const pageType = mdxPageTypes.find(
            ({ name }) => name === node.fields.pageType
          );

          createPage({
            path: node.fields.slug,
            component: getMdxTemplatePath(pageType.template),
            context: { slug: node.fields.slug },
          });
        }
      });

    // Create listing pages for .mdx page types which support pagination
    mdxPageTypes.forEach(({ name, template, perPage }) => {
      if (perPage) {
        const pages = allMdxPages.filter(
          ({ node }) => node.fields.pageType === name
        );
        const totalPages = Math.ceil(pages.length / perPage);

        Array.from({ length: totalPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/${name}` : `/${name}/${i + 1}`,
            component: getCollectionTemplatePath(template),
            context: {
              limit: perPage,
              skip: i * perPage,
              currentPage: i + 1,
              totalPages,
              hasNextPage: i + 1 < totalPages,
              hasPreviousPage: i > 0,
            },
          });
        });
      }
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Remove pages automatically created by gatsby in the pages directory
  if (/\/src\/pages.*?\.mdx$/.test(page.componentPath)) {
    deletePage(page);
    createPage({
      path: page.path,
      component: getMdxTemplatePath(),
      context: { slug: page.path },
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        config: path.resolve("./config"),
        src: path.resolve("./src"),
      },
    },
  });
};
