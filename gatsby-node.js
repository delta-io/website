const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const axios = require("axios");
const {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
} = require("./config/pages");
// const { API } = require("./apiDataYoutube");

const YOUTUBE_CHANNEL_ID = "UCSKhDO79MNcX4pIIRFD0UVg";
const YOUTUBE_PLAYLIST_API = "https://www.googleapis.com/youtube/v3/playlists";
const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";
const YOUTUBE_API_KEY = "AIzaSyAvCt91PvL80P_y8FxgVHewi6-FycxFrcQ";
const YOUTUBE_CHANNEL_SECTION =
  "https://youtube.googleapis.com/youtube/v3/channelSections";

// const sortedVideoByCreatedDateList = list => list?.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

const playListsByChanelId = async (chanelId) => {
  const URL = `${YOUTUBE_PLAYLIST_API}?part=snippet%2CcontentDetails&channelId=${chanelId}&maxResults=50&key=${YOUTUBE_API_KEY}`;

  const response = await axios.get(URL);

  return response.data.items;
};
const videoListByPlayListId = async (listId) => {
  const URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${listId}&key=${YOUTUBE_API_KEY}`;

  return axios.get(URL);
};
const createPlayList = async () => {
  const data = await playListsByChanelId(YOUTUBE_CHANNEL_ID);
  const newArr = data.map((el) => ({
    playlistId: el.id,
    playlistTitle: el.snippet.title,
  }));
  return newArr;
};
const createVideosListForPlayList = async () => {
  const getPlayList = await createPlayList();

  return getPlayList;
};
const getMultipleListForTutorial = async () => {
  const URL = `${YOUTUBE_CHANNEL_SECTION}?part=contentDetails&part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(URL);

  return response.data.items;
};
const getPlaylistById = async (playlistId) => {
  const URL = `${YOUTUBE_PLAYLIST_API}?part=snippet&maxResults=50&id=${playlistId}&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(URL);

  return response.data;
};

const getVideoListPromise = async () => {
  const playLists = await createVideosListForPlayList();

  // Get promises iterated playlistId
  const promiseList = playLists.map((playList) =>
    videoListByPlayListId(playList.playlistId)
  );

  const [...data] = await Promise.all(promiseList);

  const collectionVideos = data.map((item) => item.data.items);

  const getCollectionVideoWithIMage = collectionVideos.map((item) =>
    item.filter((sub) => Object.keys(sub.snippet.thumbnails).length !== 0)
  );

  const filteredArr = getCollectionVideoWithIMage.map((item) =>
    item.map((subItem) => ({
      id: subItem.id,
      playlistId: subItem?.snippet?.playlistId,
      publishedAt: subItem?.snippet?.publishedAt,
      title: subItem?.snippet?.title,
      description: subItem?.snippet?.description,
      thumbnails: subItem?.snippet?.thumbnails,
      url: `https://www.youtube.com/watch?v=${subItem.snippet.resourceId.videoId}`,
    }))
  );

  const createArrWithCollectionVideo = filteredArr.map((el) => ({
    playlistId: el[0].playlistId,
    videoCollection: [...el],
  }));

  const newArr = [];

  playLists.forEach((item) => {
    createArrWithCollectionVideo.forEach((el) => {
      if (item.playlistId === el.playlistId) {
        const obj = {
          ...item,
          ...el,
        };
        newArr.push(obj);
      }
    });
  });

  return newArr;
};

const getTutorialListPromise = async () => {
  const multipleList = await getMultipleListForTutorial();

  const getTechniquesTutorialsList = multipleList
    ?.filter((item) => item.snippet.title === "Techniques and Tutorials")
    .map((item) => ({
      title: item.snippet.title,
      contentDetails: item.contentDetails,
    }));

  const tutorialsPlaylistsIdPromise =
    getTechniquesTutorialsList[0].contentDetails.playlists.map((playlistId) =>
      videoListByPlayListId(playlistId)
    );
  const tutorialsPlaylistsTitlePromise =
    getTechniquesTutorialsList[0].contentDetails.playlists.map((playlistId) =>
      getPlaylistById(playlistId)
    );

  const [...tutorialsListTitle] = await Promise.all(
    tutorialsPlaylistsTitlePromise
  );

  const createMapTutorialsTitle = tutorialsListTitle.map((item) => ({
    playlistId: item.items[0].id,
    playlistTitle: item.items[0].snippet?.title,
  }));

  const [...tutorialsList] = await Promise.all(tutorialsPlaylistsIdPromise);

  const collectionTutorials = tutorialsList?.map((item) => item.data.items);

  const getCollectionTutorialWithIMage = collectionTutorials.map((item) =>
    item.filter((sub) => Object.keys(sub.snippet.thumbnails).length !== 0)
  );

  const filteredArr = getCollectionTutorialWithIMage.map((item) =>
    item.map((subItem) => ({
      id: subItem.id,
      playlistId: subItem?.snippet?.playlistId,
      publishedAt: subItem?.snippet?.publishedAt,
      title: subItem?.snippet?.title,
      description: subItem?.snippet?.description,
      thumbnails: subItem?.snippet?.thumbnails,
      url: `https://www.youtube.com/watch?v=${subItem.snippet.resourceId.videoId}`,
    }))
  );

  const createArrWithCollectionVideo = filteredArr.map((el) => ({
    playlistId: el[0].playlistId,
    videoCollection: [...el],
  }));

  const newArr = [];

  createMapTutorialsTitle.forEach((item) => {
    createArrWithCollectionVideo.forEach((el) => {
      if (item.playlistId === el.playlistId) {
        const obj = {
          ...item,
          ...el,
        };
        newArr.push(obj);
      }
    });
  });

  return newArr;
};

const createNodesFromList = ({
  response,
  createNode,
  createNodeId,
  createContentDigest,
  listName,
}) => {
  console.log("+++++++++++++++++", response);
  return response?.map((listItem, i) =>
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

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const dataForVideos = await getVideoListPromise();
  const dataForTutorials = await getTutorialListPromise();

  await createNodesFromList({
    response: dataForVideos,
    createNode,
    createNodeId,
    createContentDigest,
    listName: "Videos",
  });

  await createNodesFromList({
    response: dataForTutorials,
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
