import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardDataList from "src/components/CardDataList";

const dataListProps = {
  connectors: {
    thumbnailRatio: [1, 1],
    columns: { xs: 1, md: 2 },
  },
  videos: {
    thumbnailRatio: [16, 9],
    columns: { xs: 1, md: 2 },
    readMoreLabel: "Watch now",
  },
};

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
  }
`;

const JsonCardDataList = (props) => {
  const { data: dataList } = props;
  const data = useStaticQuery(query);

  const cards = data[dataList]?.edges.map(({ node }) => ({ ...node }));

  if (!cards) {
    return null;
  }

  return (
    <CardDataList
      cards={cards}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dataListProps[dataList]}
    />
  );
};

export default JsonCardDataList;
