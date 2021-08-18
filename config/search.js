const types = {
  pages: "Page",
  news: "News",
  allConnectorsJson: "Connector",
  allVideosJson: "Video",
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
        allConnectorsJson {
          edges {
            node {
              id
              title: name
              description
              url
            }
          }
        }
        allVideosJson {
          edges {
            node {
              id
              title
              description
              url
            }
          }
        }
      }
    `,
    index: ["title"],
    normalizer: ({ data }) =>
      Object.keys(data).reduce(
        (results, collectionName) => [
          ...results,
          ...data[collectionName].edges.map(({ node }) => {
            if (collectionName === "allMdx") {
              return {
                id: node.id,
                title: node.frontmatter.title,
                description: node.frontmatter.description,
                type: types[node.fields.pageType],
                url: node.fields.slug,
                isExternal: false,
              };
            }

            return {
              id: node.id,
              title: node.title,
              description: node.description,
              type: types[collectionName],
              url: node.url,
              isExternal: /^https?:/.test(node.url),
            };
          }),
        ],
        []
      ),
  },
};

module.exports = {
  searchPluginConfig,
};
