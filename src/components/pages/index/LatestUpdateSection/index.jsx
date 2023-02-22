import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";

import { graphql, useStaticQuery } from "gatsby";

const CenteredImageStrip = styled(ImageStrip)`
  text-align: center;
`;

const LatestUpdateSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: [fields___date], order: DESC }
        filter: { fields: { pageType: { eq: "blog" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              author
              thumbnail {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            fields {
              date(formatString: "MMMM D, YYYY")
              slug
            }
          }
        }
      }
    }
  `);

  const allBlogsList = data.allMdx.edges.map((item) => item.node);

  const createMapFromBlogList = allBlogsList
    .map(({ frontmatter, fields }) => ({
      title: frontmatter.title,
      thumbnail: frontmatter.thumbnail,
      url: fields.slug,
    }))
    .slice(0, 5);

  return (
    <Section
      background={(theme) => theme.light.bg}
      title="The Latest"
      titleSize="h2"
      centeredHeader
      padding="xxxl"
    >
      <CenteredImageStrip items={createMapFromBlogList} />
    </Section>
  );
};
export default LatestUpdateSection;
