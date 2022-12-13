const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
} = require("./config/pages");
const { STREAM_LIST, API } = require("./apiDataYoutube");

// const createPlayListPromise = (categoryList) => {
//   const promises = [];
//
//   categoryList?.forEach(item => {
//     const promiseItem = API.fetchPlaylist(item.stream_id);
//
//     promises.push(promiseItem);
//   })
//   return promises;
// }

const createPlayListItemPromise = (categoryList) => {
  const promises = [];

  categoryList?.forEach((item) => {
    const promiseItem = API.fetchPlaylistItems(item.stream_id);

    promises.push(promiseItem);
  });

  return promises;
};

const sortedVideoByCreatedDateList = (list) =>
  list?.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

const createListOfVideos = (list) => {
  const getAllList = list?.map((item) => ({
    id: item.id,
    publishedAt: item?.snippet?.publishedAt,
    title: item?.snippet?.title,
    description: item?.snippet?.description,
    thumbnail: item?.snippet?.thumbnails?.maxres?.url,
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
  }));

  return sortedVideoByCreatedDateList(getAllList);
};

const createNodesFromList = ({
  response,
  createNode,
  createNodeId,
  createContentDigest,
  listName,
}) => {
  const joinedList = response?.map((list) => list.data.items).flat();

  const getAllList = createListOfVideos(joinedList);

  const listWithImage = getAllList?.filter((item) => item.thumbnail);

  listWithImage?.map((listItem, i) =>
    createNode({
      ...listItem,
      id: createNodeId(listName + i),
      internal: {
        type: `${listName}Youtube`,
        contentDigest: createContentDigest(listItem),
      },
    })
  );
};

// const matchedArr = (streamInfo, listVideos) => {
//   const streamArr = streamInfo.data.items.forEach((stream) => {
//     listVideos.data.items.forEach(videoObj => {
//       if (stream.items[0].id === videoObj.items[0].snippet.playlistId) {
//         return {
//           streamId: stream.items[0].id,
//           streamTitle: stream.items[0].snippet.localized.title,
//           streamVideoList: videoObj.items,
//         }
//       }
//       return videoObj;
//     })
//   })
//
//   return streamArr;
// }

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  // const videosStreamData = await Promise.all(createPlayListPromise(STREAM_LIST.videos));
  const videosResponse = await Promise.all(
    createPlayListItemPromise(STREAM_LIST.videos)
  );

  // const dataForVideos = matchedArr(videosStreamData, videosResponse);

  // const tutorialsStreamData = await Promise.all(createPlayListPromise(STREAM_LIST.tutorials));
  const tutorialsResponse = await Promise.all(
    createPlayListItemPromise(STREAM_LIST.tutorials)
  );

  // const dataForTutorials = matchedArr(tutorialsStreamData, tutorialsResponse);

  createNodesFromList({
    response: videosResponse,
    createNode,
    createNodeId,
    createContentDigest,
    listName: "Videos",
  });

  createNodesFromList({
    response: tutorialsResponse,
    createNode,
    createNodeId,
    createContentDigest,
    listName: "Tutorials",
  });
};

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
  const absolutePath = node.internal.contentFilePath;
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
    createNodeField({
      node,
      name: "date",
      value:
        dateMatches && dateMatches.length
          ? dateMatches[dateMatches.length - 1]
          : "1970-01-01",
    });
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
            internal {
              contentFilePath
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
            component: `${getMdxTemplatePath(
              pageType.template
            )}?__contentFilePath=${node.internal.contentFilePath}`,
            context: { slug: node.fields.slug },
          });
        }
      });

    // Create listing pages for .mdx page types which support pagination
    mdxPageTypes.forEach(({ name, template, perPage, featuredCount }) => {
      if (perPage) {
        const pages = allMdxPages.filter(
          ({ node }) => node.fields.pageType === name
        );
        const totalPages = Math.ceil((pages.length - featuredCount) / perPage);

        Array.from({ length: totalPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/${name}` : `/${name}/${i + 1}`,
            component: `${getCollectionTemplatePath(
              template
            )}?__contentFilePath=${pages[i].node.internal.contentFilePath}`,
            context: {
              limit: i === 0 ? perPage + featuredCount : perPage,
              skip: i !== 0 ? i * perPage + featuredCount : i * perPage,
              currentPage: i + 1,
              totalPages,
              hasNextPage: i + 1 < totalPages,
              hasPreviousPage: i > 0,
              featuredCount: i === 0 ? featuredCount : 0,
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
      ...page,
      path: page.path,
      component: `${getMdxTemplatePath()}?__contentFilePath=${
        page.componentPath
      }`,
      context: {
        ...page.context,
        slug: page.path,
      },
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
