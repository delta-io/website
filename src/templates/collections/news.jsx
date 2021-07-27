import { graphql } from "gatsby";
import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import Pagination from "src/components/Pagination";
import CardDataList from "src/components/CardDataList";

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
      meta: `Posted on ${date} by ${author}`,
      thumbnail: thumbnail.publicURL,
    };
  });

  return (
    <>
      <SEO title="News" pageIndex={currentPage} />
      <PageLayout>
        <CardDataList cards={cards} />
        <Pagination
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          basePath="/news"
        />
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
