import * as React from "react";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import * as menus from "config/menus";
import Section from "src/components/Section";
import OneColumnLayout from "./components/OneColumnLayout";
import TwoColumnLayout from "./components/TwoColumnLayout";

const DefaultMdxTemplate = ({ data }) => {
  const { frontmatter = {}, body } = data.mdx;

  const sidebarMenu = menus[frontmatter.menu];

  const content = (
    <Section title={frontmatter.title} primary container={false}>
      <TypographyContainer>
        <MDX>{body}</MDX>
      </TypographyContainer>
    </Section>
  );

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        thumbnailPath={frontmatter.thumbnail?.publicURL}
      />
      <PageLayout>
        {sidebarMenu ? (
          <TwoColumnLayout sidebarMenu={sidebarMenu}>{content}</TwoColumnLayout>
        ) : (
          <OneColumnLayout width={frontmatter.width}>{content}</OneColumnLayout>
        )}
      </PageLayout>
    </>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        menu
        width
        thumbnail {
          publicURL
        }
      }
    }
  }
`;

export default DefaultMdxTemplate;
