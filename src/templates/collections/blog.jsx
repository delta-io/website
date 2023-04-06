import { graphql } from "gatsby";
import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import CardDataList from "src/components/CardDataList";
import Section from "src/components/Section";
import FilteredPosts from "src/components/FilterPosts";

const BlogCollectionTemplate = ({ data, pageContext }) => {
  const [filter, setFilter] = React.useState("");
  const { featuredCount } = pageContext;
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
      date,
      author,
      thumbnail,
    };
  });

  const handleFilter = (e) => setFilter(e.target.value);

  const normalizedStr = (query) =>
    query.toLowerCase().includes(filter.toLowerCase());

  const filteredCards = cards.filter(({ title }) => normalizedStr(title));

  return (
    <PageLayout>
      <Section
        padding="xxl"
        title="Delta Lake Blogs"
        primary
        background="white"
      >
        <FilteredPosts onChange={handleFilter} cards={filteredCards} />
        <CardDataList
          cards={filteredCards}
          showFeatured={featuredCount > 0}
          columns={{ xs: 1, sm: 2, lg: 3 }}
          density="relaxed"
          thumbnailRatio={[16, 9]}
          clampDescriptionLines={2}
        />
      </Section>
    </PageLayout>
  );
};

export const Head = ({ pageContext }) => {
  const { currentPage } = pageContext;

  return <SEO title="Delta Lake Blogs" pageIndex={currentPage} />;
};

export const pageQuery = graphql`
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
`;

export default BlogCollectionTemplate;
