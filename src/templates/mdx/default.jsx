import * as React from "react";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import * as menus from "config/menus";
import Section from "src/components/Section";
import Link from "src/components/Link";
import styled from "styled-components";
import LinkList from "src/components/LinkList";
import TwoColumnLayout from "./components/TwoColumnLayout";
import TableOfContents from "./components/TableOfContents";

const SidebarMenuLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.fontWeightBold};

  &.active {
    color: ${(props) => props.theme.light.color};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const DefaultMdxTemplate = ({ data }) => {
  const { frontmatter = {}, body, tableOfContents } = data.mdx;

  const tocItems = tableOfContents.items;
  const sidebarMenu = menus[frontmatter.menu];

  const renderSidebar = () => {
    if (sidebarMenu) {
      return (
        <LinkList
          links={sidebarMenu}
          linkComponent={SidebarMenuLink}
          renderInCurrentItem={() =>
            tocItems ? <TableOfContents items={tocItems} /> : null
          }
        />
      );
    }

    if (!tocItems) {
      return null;
    }

    return <TableOfContents items={tocItems} showTitle />;
  };

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        thumbnailPath={frontmatter.thumbnail?.publicURL}
      />
      <PageLayout>
        <TwoColumnLayout renderSidebar={renderSidebar}>
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
