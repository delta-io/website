const types = {
  pages: "Page",
  news: "News",
};

const searchPluginConfig = {
  resolve: "gatsby-plugin-local-search",
  options: {
    name: "search",
    engine: "flexsearch",
    query: `
      query SearchPluginQuery {
        allMdx {
          edges {
            node {
              id
              frontmatter {
                title
                description
              }
              fields {
                pageType
                slug
              }
              excerpt
            }
          }
        }
      }
    `,
    index: ["title"],
    normalizer: ({ data }) =>
      data.allMdx.edges.map(({ node }) => ({
        id: node.id,
        title: node.frontmatter.title,
        description: node.frontmatter.description || node.excerpt,
        type: types[node.fields.pageType],
        url: node.fields.slug,
      })),
  },
};

module.exports = {
  searchPluginConfig,
};
