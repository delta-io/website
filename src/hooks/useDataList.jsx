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
  }
`;

const useDataList = (list) => {
  const data = useStaticQuery(query);
  const nodes = data[list]?.edges.map(({ node }) => ({ ...node }));

  return nodes;
};

export default useDataList;
