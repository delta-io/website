import { google } from "googleapis";
import type { youtube_v3 } from "googleapis/build/src/apis/youtube";

interface PlaylistInfo {
  id: string;
  name: string;
  description: string | undefined;
}

interface Video {
  id: string;
  permalink: string;
  title: string;
  description: string | undefined;
  publishedAt: Date;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
}

interface FetchPlaylistVideosOptions {
  limit?: number;
}

interface FetchChannelPlaylistsOptions {
  limit?: number;
  sectionTitle?: string;
}

interface FetchChannelVideosOptions {
  limit?: number;
}

interface FetchVideosByIdsOptions {
  limit?: number;
}

interface Cache {
  playlistVideos: Record<string, youtube_v3.Schema$PlaylistItem[]>;
  channelPlaylists: Record<string, youtube_v3.Schema$Playlist[]>;
  channels: Record<string, youtube_v3.Schema$Channel>;
}

const cache: Cache = {
  playlistVideos: {},
  channelPlaylists: {},
  channels: {},
};

const getApiClient = (): youtube_v3.Youtube => {
  return google.youtube({
    version: "v3",
    auth: import.meta.env.YOUTUBE_API_KEY,
  });
};

/**
 * Retrieves a list of videos from a playlist
 */
export const fetchPlaylistVideos = async (
  playlistId: string,
  options: FetchPlaylistVideosOptions = {},
): Promise<Video[]> => {
  const { limit = 50 } = options;
  const client = getApiClient();

  const params: youtube_v3.Params$Resource$Playlistitems$List = {
    playlistId,
    part: ["snippet", "contentDetails"],
    maxResults: limit,
  };
  const cacheKey = JSON.stringify(params);
  let playlistItems = cache.playlistVideos[cacheKey];

  if (!playlistItems) {
    const res = await client.playlistItems.list(params);

    playlistItems = res?.data?.items;

    if (playlistItems) {
      cache.playlistVideos[cacheKey] = playlistItems;
    }
  }

  if (!playlistItems) {
    throw new Error(
      `Unable to retrieve playlist items for playlist ${playlistId}`,
    );
  }

  return playlistItems
    .map((item) => {
      const videoId = item?.contentDetails?.videoId;
      const title = item.snippet?.title;
      const description = item.snippet?.description;
      const publishedAt = item.snippet?.publishedAt;
      const thumbnail = item.snippet?.thumbnails?.medium;

      // A little workaround to make sure we actually have everything
      if (!videoId || !title || !publishedAt || !thumbnail?.url) {
        return;
      }

      const video = {
        id: videoId,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
        title,
        description: typeof description === "string" ? description : undefined,
        publishedAt: new Date(publishedAt),
        // Workaround since the built-in type has zero faith in being present
        thumbnail: thumbnail as { url: string; width: number; height: number },
      };

      return video;
    })
    .filter((item) => item !== undefined);
};

/**
 * Retrieves playlists from a channel, optionally filtered by a channel section title
 */
export const fetchChannelPlaylists = async (
  channelId: string,
  options: FetchChannelPlaylistsOptions = {},
): Promise<PlaylistInfo[]> => {
  const { limit = 50, sectionTitle } = options;
  const client = getApiClient();

  const params: youtube_v3.Params$Resource$Playlists$List = {
    channelId,
    part: ["snippet"],
    maxResults: limit,
  };
  const cacheKey = JSON.stringify(params);

  let playlists = cache.channelPlaylists[cacheKey];

  if (!playlists) {
    const res = await client.playlists.list(params);

    playlists = res?.data?.items;

    if (playlists) {
      cache.channelPlaylists[cacheKey] = playlists;
    }
  }

  if (!playlists) {
    throw new Error(
      `Could not retrieve playlist info for channel ${channelId}`,
    );
  }

  let filteredPlaylists = playlists;

  if (sectionTitle) {
    // Fetch channel sections to find the one matching the title
    const sectionsRes = await client.channelSections.list({
      channelId,
      part: ["snippet", "contentDetails"],
    });

    const sections = sectionsRes?.data?.items;
    const targetSection = sections?.find(
      (section) =>
        section.snippet?.title?.toLowerCase() === sectionTitle.toLowerCase(),
    );

    if (targetSection?.contentDetails?.playlists) {
      const sectionPlaylistIds = new Set(
        targetSection.contentDetails.playlists,
      );
      filteredPlaylists = playlists.filter(
        (playlist) => playlist.id && sectionPlaylistIds.has(playlist.id),
      );
    } else {
      // If section not found or has no playlists, return empty array
      return [];
    }
  }

  return filteredPlaylists
    .map((playlist) => {
      const id = playlist.id;
      const name = playlist?.snippet?.title;
      const description = playlist?.snippet?.description;

      // A little workaround to make sure we actually have everything
      if (!id || !name) {
        return;
      }

      return {
        id,
        name,
        description: typeof description === "string" ? description : undefined,
      };
    })
    .filter((playlist) => playlist !== undefined);
};

/**
 * Retrieves the latest uploads for a channel
 */
export const fetchChannelVideos = async (
  channelId: string,
  options: FetchChannelVideosOptions = {},
): Promise<Video[]> => {
  const { limit = 50 } = options;
  const client = getApiClient();

  const params: youtube_v3.Params$Resource$Channels$List = {
    id: [channelId],
    part: ["contentDetails"],
    maxResults: 1,
  };
  const cacheKey = JSON.stringify(params);
  let channel = cache.channels[cacheKey];

  if (!channel) {
    const res = await client.channels.list({
      id: [channelId],
      part: ["contentDetails"],
      maxResults: 1,
    });

    channel = res.data?.items?.[0];

    if (channel) {
      cache.channels[cacheKey] = channel;
    }
  }

  if (!channel) {
    throw new Error(`Could not fetch channel ${channelId}`);
  }

  const uploadPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadPlaylistId) {
    throw new Error(`Could not find videos for channel ${channelId}`);
  }

  return fetchPlaylistVideos(uploadPlaylistId, { limit });
};

/**
 * Retrieves a list of videos by their IDs
 */
export const fetchVideosByIds = async (
  videoIds: string[],
  options: FetchVideosByIdsOptions = {},
): Promise<Video[]> => {
  const { limit = 50 } = options;
  const client = getApiClient();

  const params: youtube_v3.Params$Resource$Videos$List = {
    id: videoIds,
    part: ["snippet", "contentDetails"],
    maxResults: limit,
  };

  const res = await client.videos.list(params);
  const videos = res?.data?.items;

  if (!videos) {
    throw new Error(`Unable to retrieve videos for IDs ${videoIds.join(", ")}`);
  }

  return videos
    .map((item) => {
      const videoId = item?.id;
      const title = item.snippet?.title;
      const description = item.snippet?.description;
      const publishedAt = item.snippet?.publishedAt;
      const thumbnail = item.snippet?.thumbnails?.medium;

      // A little workaround to make sure we actually have everything
      if (!videoId || !title || !publishedAt || !thumbnail?.url) {
        return;
      }

      const video = {
        id: videoId,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
        title,
        description: typeof description === "string" ? description : undefined,
        publishedAt: new Date(publishedAt),
        // Workaround since the built-in type has zero faith in being present
        thumbnail: thumbnail as { url: string; width: number; height: number },
      };

      return video;
    })
    .filter((item) => item !== undefined);
};
