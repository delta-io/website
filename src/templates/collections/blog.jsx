import { graphql } from "gatsby";
import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import Pagination from "src/components/Pagination";
import CardDataList from "src/components/CardDataList";
import Section from "src/components/Section";
import * as menus from "config/menus";
import TwoColumnLayout from "src/templates/mdx/components/TwoColumnLayout";

const BlogCollectionTemplate = ({ data, pageContext }) => {
  const { hasPreviousPage, hasNextPage, currentPage } = pageContext;
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
      <SEO title="Delta Lake Blog" pageIndex={currentPage} />
      <PageLayout>
        <TwoColumnLayout sidebarMenu={menus.learn}>
          <Section
            padding="xxl"
            title="Delta Lake Blog"
            primary
            background="white"
          >
            <CardDataList
              cards={cards}
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
        </TwoColumnLayout>
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
