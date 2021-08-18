import * as React from "react";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import Section from "src/components/Section";
import styled from "styled-components";
import Embed from "src/components/Embed";
import TwoColumnLayout from "./components/TwoColumnLayout";
import TableOfContents from "./components/TableOfContents";

const Thumbnail = styled(Embed)`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const PostMeta = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0 0 ${(props) => props.theme.spacing.md};
`;

const NewsMdxTemplate = ({ data }) => {
  const { frontmatter = {}, fields = {}, body, tableOfContents } = data.mdx;
  const { title, description, author, thumbnail } = frontmatter;

  const tocItems = tableOfContents.items;

  const renderSidebar = () =>
    tocItems ? <TableOfContents items={tocItems} showTitle /> : null;
  const renderThumbnail = () => <Thumbnail src={thumbnail} />;
  const renderPostMeta = () => (
    <PostMeta>
      {fields.date} by {author}
    </PostMeta>
  );

  return (
    <>
      <SEO title={title} description={description} thumbnailPath={thumbnail} />
      <PageLayout>
        <TwoColumnLayout renderSidebar={renderSidebar}>
          <Section
            title={title}
            primary
            container={false}
            subtitle={renderPostMeta}
            renderBeforeTitle={thumbnail ? renderThumbnail : undefined}
          >
            <TypographyContainer>
              <MDX>{body}</MDX>
            </TypographyContainer>
          </Section>
        </TwoColumnLayout>
      </PageLayout>
    </>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      tableOfContents(maxDepth: 4)
      frontmatter {
        title
        description
        author
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1368, height: 770)
          }
        }
      }
      fields {
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;

export default NewsMdxTemplate;
