import * as React from "react";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import Section from "src/components/Section";
import styled from "styled-components";
import TwoColumnLayout from "./components/TwoColumnLayout";
import SidebarMenu from "./components/SidebarMenu";

const ThumbnailContainer = styled.div`
  line-height: 0;
  margin-bottom: ${(props) => props.theme.spacing.md};

  img {
    display: block;
    width: 100%;
  }
`;

const PostMeta = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0 0 ${(props) => props.theme.spacing.md};
`;

const NewsMdxTemplate = ({ data }) => {
  const { frontmatter = {}, fields = {}, body, tableOfContents } = data.mdx;
  const {
    title,
    description,
    author,
    thumbnail: { publicURL: thumbnail },
  } = frontmatter;

  const renderSidebar = () => <SidebarMenu links={tableOfContents.items} />;
  const renderThumbnail = () => (
    <ThumbnailContainer>
      <img src={thumbnail} alt="" />
    </ThumbnailContainer>
  );
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
          publicURL
        }
      }
      fields {
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;

export default NewsMdxTemplate;
