import * as React from "react";

import PageLayout from "src/components/PageLayout";
import Section from "src/components/Section";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import CardDataList from "src/components/CardDataList";
import Pagination from "src/components/Pagination";

const UserStoriesCollectionTemplate = ({ data, pageContext }) => {
  const { hasPreviousPage, hasNextPage, currentPage, featuredCount } =
    pageContext;
  const { edges } = data.allMdx;

  if (!edges.length) {
    return <div>No user stories!</div>;
  }

  const cards = edges.map(({ node }) => {
    const { frontmatter = {}, fields = {} } = node;
    const { title, description, author, thumbnail } = frontmatter;
    const { slug } = fields;

    return {
      title,
      description,
      url: slug,
      meta: author,
      thumbnail,
    };
  });

  return (
    <PageLayout>
      <Section padding="xxl" title="Case Studies" primary background="white">
        <CardDataList
          cards={cards}
          showFeatured={featuredCount > 0}
          columns={{ xs: 1, sm: 2, lg: 3 }}
          density="relaxed"
          thumbnailRatio={[16, 9]}
          clampDescriptionLines={2}
        />
        <Pagination
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          basePath="/user-stories"
        />
      </Section>
    </PageLayout>
  );
};

export const Head = ({ pageContext }) => {
  const { currentPage } = pageContext;

  return <SEO title="User Stories" pageIndex={currentPage} />;
};

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { pageType: { eq: "user-stories" } } }
      limit: $limit
      skip: $skip
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
`;

export default UserStoriesCollectionTemplate;
