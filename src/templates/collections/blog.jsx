import { graphql } from "gatsby";
import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import Pagination from "src/components/Pagination";
import CardDataList from "src/components/CardDataList";
import Section from "src/components/Section";

const BlogCollectionTemplate = ({ data, pageContext }) => {
  const { hasPreviousPage, hasNextPage, currentPage, featuredCount } =
    pageContext;
  const { edges } = data.allMdx;

  if (!edges.length) {
    return <div>No articles found!</div>;
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
      thumbnail,
    };
  });

  return (
    <>
      <SEO title="Delta Lake Blogs" pageIndex={currentPage} />
      <PageLayout>
        <Section
          padding="xxl"
          title="Delta Lake Blogs"
          primary
          background="white"
        >
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
            basePath="/blog"
          />
        </Section>
      </PageLayout>
    </>
  );
};

export const pageQuery = graphql`
  query BlogCollectionTemplateQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { pageType: { eq: "blog" } } }
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
                gatsbyImageData(width: 700, height: 394)
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

export default BlogCollectionTemplate;
