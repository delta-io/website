import { graphql } from "gatsby";
import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import Pagination from "src/components/Pagination";
import CardDataList from "src/components/CardDataList";
import Section from "src/components/Section";

const NewsCollectionTemplate = ({ data, pageContext }) => {
  const { hasPreviousPage, hasNextPage, currentPage } = pageContext;
  const { edges } = data.allMdx;

  if (!edges.length) {
    return <div>No news articles found!</div>;
  }

  const cards = edges.map(({ node }) => {
    const { frontmatter = {}, fields = {} } = node;
    const { title, description, author, thumbnail } = frontmatter;
    const { date, slug } = fields;

    return {
      title,
      description,
      url: slug,
      meta: `${date} by ${author}`,
      thumbnail: thumbnail.publicURL,
    };
  });

  return (
    <>
      <SEO title="Delta Lake News" pageIndex={currentPage} />
      <PageLayout>
        <Section
          padding="xxl"
          title="Delta Lake News"
          primary
          background="white"
        >
          <CardDataList cards={cards} columns={{ xs: 1, sm: 2, lg: 3 }} />
          <Pagination
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            currentPage={currentPage}
            basePath="/news"
          />
        </Section>
      </PageLayout>
    </>
  );
};

export const pageQuery = graphql`
  query NewsListTemplateQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { pageType: { eq: "news" } } }
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
              publicURL
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

export default NewsCollectionTemplate;
