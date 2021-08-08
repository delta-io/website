import * as React from "react";
import styled from "styled-components";
import Section from "src/components/Section";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";
import { code, community, docs, learn, news } from "config/menus";
import Link from "src/components/Link";
import logo from "./delta-lake-logo.svg";
import theLinuxFoundationLogo from "./the-linux-foundation-logo.svg";

const menus = [
  {
    title: "Code",
    links: code,
  },
  {
    title: "Learn",
    links: learn,
  },
  {
    title: "News",
    links: news,
  },
  {
    title: "Community",
    links: community,
  },
  {
    title: "Docs",
    links: docs,
  },
];

const Copyright = styled.div`
  ${(props) =>
    props.theme.mediaBreakpointDown("md")(`
    margin-top: ${props.theme.spacing.xl};
  `)}

  ${(props) =>
    props.theme.mediaBreakpointBetween(
      "md",
      "xl"
    )(`
    grid-row: 1;
    width: 250px;
  `)}

  ${(props) =>
    props.theme.mediaBreakpointUp("xl")(`
    margin-top: ${props.theme.spacing.xl};
    text-align: center;
  `)}

  a {
    color: inherit;
  }

  a:hover {
    color: white;
  }
`;

const Footer = styled.footer`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const FooterLogo = styled.img`
  ${(props) =>
    props.theme.mediaBreakpointUp("xl")(`
    display: none;
  `)}
`;

const FooterMenu = styled.nav`
  display: grid;
  grid-template-rows: auto;
  row-gap: ${(props) => props.theme.spacing.xs};
  align-content: start;
`;

const FooterMenuLink = styled(Link)`
  color: ${(props) => props.theme.dark.color};
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

const PageFooter = () => (
  <Footer>
    <Section padding="xl">
      <Grid
        columns={{ xs: 1, md: ["max-content", "auto"], xl: 1 }}
        gutter={{ xs: "md", md: "xl" }}
      >
        <Grid columns={{ xs: 1, md: 3, xl: 5 }}>
          {menus.map((menu) => (
            <FooterMenu key={menu.title}>
              {menu.title}
              {menu.links.map((link) => (
                <FooterMenuLink key={link.url} href={link.url}>
                  {link.label}
                </FooterMenuLink>
              ))}
            </FooterMenu>
          ))}
        </Grid>
        <Copyright>
          <FooterLogo src={logo} alt="Delta Lake" width={133} height={28} />
          <Typography variant="p2">
            Copyright © {new Date().getFullYear()} Delta Lake, a series of LF
            Projects, LLC. For web site terms of use, trademark policy and other
            project polcies please see{" "}
            <a href="https://lfprojects.org">https://lfprojects.org</a>.
          </Typography>
          <img src={theLinuxFoundationLogo} alt="The Linux Foundation" />
        </Copyright>
      </Grid>
    </Section>
  </Footer>
);

export default PageFooter;
