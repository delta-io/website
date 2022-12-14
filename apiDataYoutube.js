const axios = require("axios");

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

const YOUTUBE_PLAYLIST_API = "https://www.googleapis.com/youtube/v3/playlists";
const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

const API = {
  playListsByChanelId: async (chanelId) => {
    const URL = `${YOUTUBE_PLAYLIST_API}?part=snippet%2CcontentDetails&channelId=${chanelId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;

    const response = await axios.get(URL);

    return response.data.items;
  },

  videoListByPlayListId: async (listId) => {
    const URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${listId}&key=${process.env.YOUTUBE_API_KEY}`;

    return axios.get(URL);
  },
};

module.exports = {
  STREAM_LIST,
  API,
};
