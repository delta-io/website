const path = require("path");
const axios = require("axios");
const { createFilePath } = require("gatsby-source-filesystem");
const {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
} = require("./config/pages");

// Create Nodes for allVideosYoutube and for allTutorialsYoutube

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

const STREAM_LIST = {
  videos: [
    {
      stream_title: "Delta Rust",
      stream_id: "PLzxP01GQMpjeBlOKv7iOXOJIw5aFdx1B5",
    },
    {
      stream_title: "Delta Lake Community Office Hours",
      stream_id: "PLzxP01GQMpjeqxQl1A33U-hBeGmM4ozZP",
    },
    {
      stream_title: "Delta Lake Discussions with Denny Lee (D3L2)",
      stream_id: "PLzxP01GQMpjfcwFdzBpnZrQIUHxhOddq7",
    },
    {
      stream_title: "Simon & Denny Ask Us Anything",
      stream_id: "PLzxP01GQMpjeY2XTCTxPLPKEl4SONqgrO",
    },
    {
      stream_title: "Delta Lake Tech Talks",
      stream_id: "PLzxP01GQMpjfA3tHZFx6214URO-6jrIw5",
    },
  ],
  tutorials: [
    {
      stream_title: "Getting Started with Delta Lake",
      stream_id: "PLzxP01GQMpjd0zVTuLYJCaR2nZgKsZQcX",
    },
    {
      stream_title: "Under the Sediments: Diving into Delta Lake",
      stream_id: "PLzxP01GQMpjcRSjgOqYpT84f8JiTT-rcd",
    },
    {
      stream_title: "Delta Lake DW Techniques",
      stream_id: "PLzxP01GQMpjdN1HvcdgFW00fLMx8XCN8F",
    },
    {
      stream_title: "Delta Lake Tutorials",
      stream_id: "PLzxP01GQMpjfxBXBVmzOL43mLLdH0E4TE",
    },
  ],
};

const fetchStream = async (id) => {
  const URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${id}&key=${process.env.YOUTUBE_API_KEY}`;
  return axios.get(URL);
};

const createListOfPromises = (streamListCategory) => {
  const promises = [];

  streamListCategory.forEach((item) => {
    const promiseItem = fetchStream(item.stream_id);

    promises.push(promiseItem);
  });

  return promises;
};

const sortedVideoByCreatedDateList = (list) =>
  list.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

const createListOfVideos = (list) => {
  const getAllList = list.map((item) => ({
    id: item.id,
    publishedAt: item?.snippet?.publishedAt,
    title: item?.snippet?.title,
    description: item?.snippet?.description,
    thumbnail: item?.snippet?.thumbnails?.maxres?.url,
    url: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
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
  const joinedList = response.map((list) => list.data.items).flat();

  const getAllList = createListOfVideos(joinedList);

  const listWithImage = getAllList.filter((item) => item.thumbnail);
  listWithImage.map((listItem, i) =>
    createNode({
      ...listItem,
      id: createNodeId(listItem.id + i),
      internal: {
        type: `${listName}Youtube`,
        contentDigest: createContentDigest(listItem),
      },
    })
  );
};

// --------------------- !!!!!!!!! ------------------------- //

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  Promise.all(createListOfPromises(STREAM_LIST.videos)).then((response) => {
    createNodesFromList({
      response,
      createNode,
      createNodeId,
      createContentDigest,
      listName: "Videos",
    });
  });

  Promise.all(createListOfPromises(STREAM_LIST.tutorials)).then((response) => {
    createNodesFromList({
      response,
      createNode,
      createNodeId,
      createContentDigest,
      listName: "Tutorials",
    });
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
