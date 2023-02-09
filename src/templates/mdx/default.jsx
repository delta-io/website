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

const DefaultMdxTemplate = ({ location, data, children }) => {
  const { frontmatter = {} } = data.mdx;

  const sidebarMenu = menus[frontmatter.menu];

  const content = (
    <Section title={frontmatter.title} primary container={false}>
      <TypographyContainer>
        <MDX>{children}</MDX>
      </TypographyContainer>
    </Section>
  );

  return (
    <PageLayout>
      {sidebarMenu ? (
        <TwoColumnLayout
          sidebarMenu={sidebarMenu}
          currentPathname={location.pathname}
        >
          {content}
        </TwoColumnLayout>
      ) : (
        <OneColumnLayout width={frontmatter.width}>{content}</OneColumnLayout>
      )}
    </PageLayout>
  );
};

export const Head = ({ data }) => {
  const { frontmatter = {} } = data.mdx;
  const { title, description, thumbnail } = frontmatter;

  console.log(thumbnail);

  return (
    <SEO
      title={title}
      description={description}
      thumbnailPath={thumbnail?.publicURL}
    />
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
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
