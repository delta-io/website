import { useStaticQuery, graphql } from "gatsby";

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
    videosYoutube: allVideosYoutube {
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
  return data[list]?.edges.map(({ node }) => ({ ...node }));
};

export default useDataList;
