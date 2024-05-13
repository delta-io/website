const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const axios = require("axios");
const {
  mdxPageTypes,
  mdxTemplatesBasePath,
  collectionTemplatesBasePath,
} = require("./config/pages");

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_CHANNEL_ID = "UCSKhDO79MNcX4pIIRFD0UVg";
const YOUTUBE_PLAYLIST_API = "https://www.googleapis.com/youtube/v3/playlists";
const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";
const YOUTUBE_CHANNEL_SECTION =
  "https://youtube.googleapis.com/youtube/v3/channelSections";

// Requests
const playListsByChanelId = async (chanelId) => {
  const URL = `${YOUTUBE_PLAYLIST_API}?part=snippet%2CcontentDetails&channelId=${chanelId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;

  const response = await axios.get(URL);

  return response.data.items;
};
const videoListByPlayListId = async (listId) => {
  const URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&part=contentDetails&playlistId=${listId}&key=${process.env.YOUTUBE_API_KEY}`;

  return axios.get(URL);
};
const createPlayList = async () => {
  const data = await playListsByChanelId(YOUTUBE_CHANNEL_ID);
  return data.map((el) => ({
    playlistId: el.id,
    playlistTitle: el.snippet.title,
  }));
};
const getMeetingsList = async () => {
  const URL = `${YOUTUBE_SEARCH_API}/?type=video&maxResults=50&eventType=upcoming&part=snippet&key=${process.env.YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}`;
  const response = await axios.get(URL);

  return response.data.items;
};
const getSectionLists = async () => {
  const URL = `${YOUTUBE_CHANNEL_SECTION}?part=contentDetails&part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`;
  const response = await axios.get(URL);

  return response.data.items;
};

// get all playlists from youtube
const getPlaylistAllItems = async (
  playlistId,
  playlistTitle,
  playListDescription
) => {
  const playlistItemsURL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`;
  try {
    const response = await axios.get(playlistItemsURL);
    return {
      playlistId,
      playlistTitle,
      playlistDescription: playListDescription,
      videoCollection: response.data.items.map((item) => {
        const { thumbnails } = item.snippet;
        const highThumbnail = thumbnails &&
          thumbnails.high && {
            height: thumbnails.high.height,
            url: thumbnails.high.url,
            width: thumbnails.high.width,
          };

        return {
          description: item.snippet.description,
          id: item.snippet.resourceId.videoId,
          playlistId,
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          thumbnail: highThumbnail ? { high: highThumbnail } : null,
          videoId: item.snippet.resourceId.videoId,
        };
      }),
    };
  } catch (error) {
    console.error("Error while retrieving a video playlist: ", error);
    return null;
  }
};
//

// Helpers

const reduceArrItems = (collection) =>
  collection.map((item) =>
    item.map((subItem) => ({
      id: subItem.id,
      playlistId: subItem?.snippet?.playlistId,
      publishedAt: subItem?.snippet?.publishedAt,
      title: subItem?.snippet?.title,
      description: subItem?.snippet?.description,
      thumbnail: subItem?.snippet?.thumbnails,
      videoId: subItem.snippet.resourceId.videoId,
      url: `https://www.youtube.com/watch?v=${subItem.snippet.resourceId.videoId}`,
      videoUploadDate: subItem?.contentDetails?.videoPublishedAt,
    }))
  );

const matchedArrByPlaylistId = (arr1, arr2) => {
  const newArr = [];

  arr1.forEach((item) => {
    arr2.forEach((el) => {
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

const createListIdForEachSection = async () => {
  const playlistsDividedBySection = await getSectionLists();

  const arr = playlistsDividedBySection
    ?.filter((el) => el.contentDetails)
    .map((item) => ({
      type: item.snippet.type,
      playlists: item.contentDetails.playlists,
      sectionTitle: item.snippet.title,
    }));

  const tutorialPlaylists = arr
    .filter((item) => item.sectionTitle === "Techniques and Tutorials")
    .map((el) => el.playlists)
    .flat();

  const videosPlaylist = arr
    .filter((el) => el.type === "singleplaylist")
    .map((item) => item.playlists)
    .flat();

  return {
    videosPlaylist: [...videosPlaylist, ...tutorialPlaylists],
    tutorialPlaylists,
  };
};

const dataForSeparatedSection = async (playListsAll, playlistType) => {
  // if we do not have dividing for section and do not have playlistType

  let promisesList;
  if (playlistType.length > 0) {
    promisesList = playlistType.map((playlistId) =>
      videoListByPlayListId(playlistId)
    );
  } else {
    promisesList = playListsAll
      .map((item) => item.playlistId)
      .map((playlistId) => videoListByPlayListId(playlistId));
  }

  const [...data] = await Promise.all(promisesList);

  const collectionVideos = data.map((item) => item.data.items);

  const getCollectionVideosWithImage = collectionVideos?.map((item) =>
    item.filter((sub) => Object.keys(sub.snippet.thumbnails).length !== 0)
  );

  const reducedObjList = reduceArrItems(getCollectionVideosWithImage);

  const createArrWithPlaylistId = reducedObjList.map((el) => ({
    playlistId: el[0]?.playlistId,
    videoCollection: [...el],
  }));
  const resultListForNodes = matchedArrByPlaylistId(
    playListsAll,
    createArrWithPlaylistId
  );

  return resultListForNodes;
};

// Get collections

const getVideoListPromise = async () => {
  const playListsAll = await createPlayList();
  const playlistForSection = await createListIdForEachSection();

  const videosList = dataForSeparatedSection(
    playListsAll,
    playlistForSection.videosPlaylist
  );

  const tutorialsList = dataForSeparatedSection(
    playListsAll,
    playlistForSection.tutorialPlaylists
  );

  return [videosList, tutorialsList];
};

const getArrForMeetingsNodes = async () => {
  const list = await getMeetingsList();

  const mock = [
    {
      videoId: "",
      url: "",
      channelId: "",
      title: "",
      description: "",
      publishTime: "",
      publishedAt: "",
      thumbnail: {
        high: {
          height: "",
          url: "",
          width: "",
        },
      },
    },
  ];

  const arr = list?.map((item) => ({
    videoId: item.id.videoId,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    channelId: item.snippet.channelId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishTime: item.snippet.publishTime,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnail || item.snippet.thumbnails,
  }));

  return arr.length > 0 ? arr : mock;
};

const createNodesFromList = ({
  response,
  createNode,
  createNodeId,
  createContentDigest,
  listName,
}) =>
  response?.map((listItem, i) =>
    createNode({
      ...listItem,
      id: createNodeId(listName + i),
      internal: {
        type: `${listName}Youtube`,
        contentDigest: createContentDigest(listItem),
      },
    })
  );

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const [videoSectionPromise, tutorialSectionPromise] =
    await getVideoListPromise();

  const [dataForVideos, dataForTutorials, dataForMeetings] = await Promise.all([
    videoSectionPromise,
    tutorialSectionPromise,
    getArrForMeetingsNodes(),
  ]);

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

  await createNodesFromList({
    response: dataForMeetings,
    createNode,
    createNodeId,
    createContentDigest,
    listName: "Meetings",
  });

  const playlists = await playListsByChanelId(YOUTUBE_CHANNEL_ID);

  const processPlaylist = async (playlist) => {
    const playlistData = await getPlaylistAllItems(
      playlist.id,
      playlist.snippet.title,
      playlist.snippet.description
    );

    if (playlistData) {
      createNode({
        ...playlistData,
        id: createNodeId(`playlist-${playlistData.playlistId}`),
        internal: {
          type: "YoutubePlaylist",
          content: JSON.stringify(playlistData),
          contentDigest: createContentDigest(playlistData),
        },
      });
    }
  };

  await Promise.all(playlists.map(processPlaylist));
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
