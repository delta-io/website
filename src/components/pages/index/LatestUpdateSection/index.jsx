import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

const CenteredImageStrip = styled(ImageStrip)`
  text-align: center;
`;

const LatestUpdateSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
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
              date(formatString: "MMMM D, YYYY")
            }
            fields {
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
      date: fields.date,
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
