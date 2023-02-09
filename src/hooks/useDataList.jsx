import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query JsonCardDataListQuery {
    connectors: allConnectorsJson {
      edges {
        node {
          title: name
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 70
                height: 70
                placeholder: NONE
                transformOptions: { fit: CONTAIN }
                backgroundColor: "#FFFFFF"
              )
            }
          }
          url
          docs
          source_code
          description
          id
        }
      }
    }
    community: allCommunityJson {
      edges {
        node {
          title: name
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 70
                height: 70
                placeholder: NONE
                transformOptions: { fit: CONTAIN }
                backgroundColor: "#FFFFFF"
              )
            }
          }
          url
          docs
          source_code
          description
          id
        }
      }
    }
    services: allServicesJson {
      edges {
        node {
          title: name
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 70
                height: 70
                placeholder: NONE
                transformOptions: { fit: CONTAIN }
                backgroundColor: "#FFFFFF"
              )
            }
          }
          url
          docs
          source_code
          description
          id
        }
      }
    }
    sharing: allSharingJson {
      edges {
        node {
          title: name
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 70
                height: 70
                placeholder: NONE
                transformOptions: { fit: CONTAIN }
                backgroundColor: "#FFFFFF"
              )
            }
          }
          url
          docs
          source_code
          description
          id
        }
      }
    }
    videos: allVideosJson {
      edges {
        node {
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 700, height: 394)
            }
          }
          title
          url
          id
        }
      }
    }
    tutorials: allTutorialsJson {
      edges {
        node {
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 700, height: 394)
            }
          }
          title
          url
          id
        }
      }
    }
    meetings: allMeetingsJson {
      edges {
        node {
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 700, height: 394)
            }
          }
          title
          url
          id
        }
      }
    }
    organizationLogos: allOrganizationLogosJson {
      edges {
        node {
          name
          logo {
            childImageSharp {
              gatsbyImageData(width: 500, placeholder: TRACED_SVG)
            }
          }
        }
      }
    }
    latestBlogs: allLatestBlogsJson {
      edges {
        node {
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 700, height: 394)
            }
          }
          title
          url
          id
        }
      }
    }
    conferences: allConferencesJson {
      edges {
        node {
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 700, height: 394)
            }
          }
          title
          url
          id
        }
      }
    }
    videosYoutube: allVideosYoutube(
      sort: { fields: videoCollection___videoUploadDate, order: DESC }
    ) {
      edges {
        node {
          playlistId
          playlistTitle
          id
          videoCollection {
            description
            id
            playlistId
            publishedAt
            title
            url
            thumbnail {
              high {
                height
                url
                width
              }
            }
            videoUploadDate
            videoId
          }
        }
      }
    }
    tutorialsYoutube: allTutorialsYoutube(
      sort: { fields: videoCollection___videoUploadDate, order: DESC }
    ) {
      edges {
        node {
          id
          playlistId
          playlistTitle
          videoCollection {
            description
            id
            playlistId
            publishedAt
            title
            url
            thumbnail {
              high {
                height
                url
                width
              }
            }
            videoUploadDate
            videoId
          }
        }
      }
    }
  }
`;

const youtubeVideoDescriptions = [
  {
    playlistTitle: "Last Week in a Byte",
    description: "Get the latest Delta Lake news and events ... a week late!",
  },
  {
    playlistTitle: "Delta Lake Community Office Hours",
    description:
      "Join our regular community office hours to discuss issues around the Delta Lake community",
  },
  {
    playlistTitle: "Simon & Denny Ask Us Anything",
    description:
      "Join Simon Whiteley (Advancing Analytics) and Denny Lee (Databricks) and ask your burning Delta Lake, Lakehouse questions",
  },
  {
    playlistTitle: "Delta Lake Discussions with Denny Lee (D3L2)",
    description:
      "Watch the vidcast (or listen to this podcast) with Delta Lake customers and/or contributors",
  },
  {
    playlistTitle: "Delta Lake Tech Talks",
    description:
      "Join our regular technical webinar series on the latest Delta Lake features and integrations",
  },
  {
    playlistTitle: "Delta Rust",
    description:
      "Would you like to know more about the Delta Rust ecosystem? Watch these videos!",
  },
  {
    playlistTitle: "Delta Lake Tutorials",
    description:
      "Jumpstart your Delta Lake technical implementation with these tutorials",
  },
  {
    playlistTitle: "Getting Started with Delta Lake",
    description: "Jumpstart your Delta Lake concepts with this video series",
  },
  {
    playlistTitle: "Delta Lake DW Techniques",
    description:
      "Apply Data Warehousing techniques to your Delta Lake-based lakehouse.",
  },
  {
    playlistTitle: "Under the Sediments: Diving into Delta Lake",
    description: "Dive deep into the internals and Delta Lake code-base",
  },
  {
    playlistTitle: "Conference Talks",
    description: "Watch these conference talks that are not on YouTube.",
  },
];

const useDataList = (list) => {
  const data = useStaticQuery(query);

  const getList = (listName) =>
    data[listName]?.edges.map(({ node }) => ({ ...node }));

  if (list === "videosYoutube") {
    const allPlaylistsForVideos = getList(list);
    const conferenceVideoList = getList("conferences");

    const playlistConference = {
      playlistId: "manually_added_playlist_id",
      playlistTitle: "Conference Talks",
      videoCollection:
        conferenceVideoList.length > 0 ? conferenceVideoList : [],
    };

    // create one list from two stream
    const finallyList = [...allPlaylistsForVideos, playlistConference];

    // list which will be used to sort finallyList on it
    const listFocus = youtubeVideoDescriptions.map(
      (item) => item.playlistTitle
    );

    // sorted playlists regarding listFocus
    const sortedPlaylists = (array, sortArray) =>
      [...array].sort(
        (a, b) =>
          sortArray.indexOf(a.playlistTitle) -
          sortArray.indexOf(b.playlistTitle)
      );

    // added description from manually created array to playlists array which we get from Youtube API
    const arr = sortedPlaylists(finallyList, listFocus).map((listItem) => {
      const obj = {
        ...listItem,
        playlistDescription: "",
      };
      youtubeVideoDescriptions.forEach((el) => {
        if (el.playlistTitle === listItem.playlistTitle) {
          obj.playlistDescription = el.description;
        }
      });
      return obj;
    });

    return arr;
  }

  return getList(list);
};

export default useDataList;
