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
    tutorialsYoutube: allTutorialsYoutube {
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
            thumbnails {
              high {
                height
                url
                width
              }
            }
          }
        }
      }
    }
  }
`;

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

    return [playlistConference, ...allPlaylistsForVideos];
  }

  return getList(list);
};

export default useDataList;
