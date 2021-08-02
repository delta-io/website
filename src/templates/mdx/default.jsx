import * as React from "react";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import * as menus from "config/menus";
import Section from "src/components/Section";
import TwoColumnLayout from "./components/TwoColumnLayout";
import SidebarMenu from "./components/SidebarMenu";

const sidebars = {
  toc:
    ({ tableOfContents }) =>
    () =>
      <SidebarMenu links={tableOfContents.items} />,
  menu:
    ({ frontmatter }) =>
    () => {
      const { menu } = frontmatter;

      const links = menus[menu];

      if (!links) {
        return null;
      }

      return (
        <SidebarMenu
          links={links.map((link) => ({
            ...link,
            title: link.label,
          }))}
        />
      );
    },
};

const DefaultMdxTemplate = ({ data }) => {
  const { frontmatter = {}, body } = data.mdx;

  const sidebar = sidebars[frontmatter.sidebar];

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        thumbnailPath={frontmatter.thumbnail?.publicURL}
      />
      <PageLayout>
        <TwoColumnLayout
          renderSidebar={sidebar ? sidebar(data.mdx) : undefined}
        >
          <Section title={frontmatter.title} primary container={false}>
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
      body
      frontmatter {
        title
        description
        sidebar
        menu
        thumbnail {
          publicURL
        }
      }
      tableOfContents(maxDepth: 4)
    }
  }
`;

export default DefaultMdxTemplate;
