import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { google } from "googleapis";
import {
  fetchPlaylistVideos,
  fetchChannelPlaylists,
  fetchChannelVideos,
  fetchVideosByIds,
} from "./fetchYoutube";

vi.mock("googleapis", () => {
  return {
    google: {
      youtube: vi.fn(),
    },
  };
});

describe("fetchYoutube", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockYoutubeClient: any;

  beforeEach(() => {
    mockYoutubeClient = {
      channels: {
        list: vi.fn().mockResolvedValue({
          data: {
            items: [
              {
                contentDetails: {
                  relatedPlaylists: {
                    uploads: "playlist-id",
                  },
                },
              },
            ],
          },
        }),
      },
      playlists: {
        list: vi.fn().mockResolvedValue({
          data: {
            items: [
              {
                id: "playlist-id",
                snippet: {
                  title: "Playlist title",
                  description: "Playlist description",
                },
              },
              {
                id: "playlist-id-2",
                snippet: {
                  title: "Another Playlist",
                  description: "Another description",
                },
              },
            ],
          },
        }),
      },
      playlistItems: {
        list: vi.fn().mockResolvedValue({
          data: {
            items: [
              {
                snippet: {
                  title: "my first video",
                  publishedAt: "2025-02-08T05:13:17.171Z",
                  thumbnails: {
                    medium: {
                      url: "#",
                      width: 120,
                      height: 60,
                    },
                  },
                },
                contentDetails: {
                  videoId: "video-1",
                },
              },
            ],
          },
        }),
      },
      channelSections: {
        list: vi.fn().mockResolvedValue({
          data: {
            items: [
              {
                snippet: {
                  title: "Featured Playlists",
                },
                contentDetails: {
                  playlists: ["playlist-id"],
                },
              },
              {
                snippet: {
                  title: "Other Section",
                },
                contentDetails: {
                  playlists: ["playlist-id-2"],
                },
              },
            ],
          },
        }),
      },
      videos: {
        list: vi.fn().mockResolvedValue({
          data: {
            items: [
              {
                id: "video-1",
                snippet: {
                  title: "Video 1",
                  description: "Description 1",
                  publishedAt: "2025-02-08T05:13:17.171Z",
                  thumbnails: {
                    medium: {
                      url: "#",
                      width: 120,
                      height: 60,
                    },
                  },
                },
              },
              {
                id: "video-2",
                snippet: {
                  title: "Video 2",
                  description: "Description 2",
                  publishedAt: "2025-02-09T05:13:17.171Z",
                  thumbnails: {
                    medium: {
                      url: "#",
                      width: 120,
                      height: 60,
                    },
                  },
                },
              },
            ],
          },
        }),
      },
    };
    (google.youtube as Mock).mockReturnValue(mockYoutubeClient);
  });

  describe("fetchPlaylistVideos", () => {
    it("should load videos from a playlist with default options", async () => {
      const videos = await fetchPlaylistVideos("my-playlist-id");

      expect(videos).toEqual([
        {
          description: undefined,
          id: "video-1",
          permalink: "https://www.youtube.com/watch?v=video-1",
          publishedAt: new Date("2025-02-08T05:13:17.171Z"),
          thumbnail: {
            height: 60,
            url: "#",
            width: 120,
          },
          title: "my first video",
        },
      ]);
    });

    it("should respect custom limit option", async () => {
      await fetchPlaylistVideos("my-playlist-id", { limit: 7 });

      expect(mockYoutubeClient.playlistItems.list).toHaveBeenCalledWith({
        playlistId: "my-playlist-id",
        part: ["snippet", "contentDetails"],
        maxResults: 7,
      });
    });
  });

  describe("fetchChannelVideos", () => {
    it("should load videos from a channel with default options", async () => {
      const videos = await fetchChannelVideos("myChannelId");

      expect(videos).toEqual([
        {
          description: undefined,
          id: "video-1",
          permalink: "https://www.youtube.com/watch?v=video-1",
          publishedAt: new Date("2025-02-08T05:13:17.171Z"),
          thumbnail: {
            height: 60,
            url: "#",
            width: 120,
          },
          title: "my first video",
        },
      ]);
    });

    it("should respect custom limit option", async () => {
      await fetchChannelVideos("myChannelId", { limit: 5 });

      expect(mockYoutubeClient.playlistItems.list).toHaveBeenCalledWith({
        playlistId: "playlist-id",
        part: ["snippet", "contentDetails"],
        maxResults: 5,
      });
    });
  });

  describe("fetchChannelPlaylists", () => {
    it("should load all playlists from a channel with default options", async () => {
      const playlists = await fetchChannelPlaylists("myChannelId");

      expect(playlists).toEqual([
        {
          id: "playlist-id",
          name: "Playlist title",
          description: "Playlist description",
        },
        {
          id: "playlist-id-2",
          name: "Another Playlist",
          description: "Another description",
        },
      ]);
    });

    it("should respect custom limit option", async () => {
      await fetchChannelPlaylists("myChannelId", { limit: 1 });

      expect(mockYoutubeClient.playlists.list).toHaveBeenCalledWith({
        channelId: "myChannelId",
        part: ["snippet"],
        maxResults: 1,
      });
    });

    it("should filter playlists by section title", async () => {
      const playlists = await fetchChannelPlaylists("myChannelId", {
        sectionTitle: "Featured Playlists",
      });

      expect(playlists).toEqual([
        {
          id: "playlist-id",
          name: "Playlist title",
          description: "Playlist description",
        },
      ]);
    });

    it("should return empty array when section is not found", async () => {
      const playlists = await fetchChannelPlaylists("myChannelId", {
        sectionTitle: "Non-existent Section",
      });

      expect(playlists).toEqual([]);
    });

    it("should be case insensitive when matching section title", async () => {
      const playlists = await fetchChannelPlaylists("myChannelId", {
        sectionTitle: "featured playlists",
      });

      expect(playlists).toEqual([
        {
          id: "playlist-id",
          name: "Playlist title",
          description: "Playlist description",
        },
      ]);
    });
  });

  describe("fetchVideosByIds", () => {
    it("should load videos by their IDs with default options", async () => {
      const videos = await fetchVideosByIds(["video-1", "video-2"]);

      expect(videos).toEqual([
        {
          id: "video-1",
          permalink: "https://www.youtube.com/watch?v=video-1",
          title: "Video 1",
          description: "Description 1",
          publishedAt: new Date("2025-02-08T05:13:17.171Z"),
          thumbnail: {
            url: "#",
            width: 120,
            height: 60,
          },
        },
        {
          id: "video-2",
          permalink: "https://www.youtube.com/watch?v=video-2",
          title: "Video 2",
          description: "Description 2",
          publishedAt: new Date("2025-02-09T05:13:17.171Z"),
          thumbnail: {
            url: "#",
            width: 120,
            height: 60,
          },
        },
      ]);
    });

    it("should respect custom limit option", async () => {
      await fetchVideosByIds(["video-1", "video-2"], { limit: 1 });

      expect(mockYoutubeClient.videos.list).toHaveBeenCalledWith({
        id: ["video-1", "video-2"],
        part: ["snippet", "contentDetails"],
        maxResults: 1,
      });
    });
  });
});
