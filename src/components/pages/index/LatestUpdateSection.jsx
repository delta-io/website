import color from "color";
import { Link } from "gatsby";
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";

const updates = [
  {
    title: "Latest news article",
    url: "#",
  },
  {
    title: "Latest news article",
    url: "#",
  },
  {
    title: "Latest news article",
    url: "#",
  },
  {
    title: "Latest news article",
    url: "#",
  },
];

const CardThumbnail = styled.div`
  padding-top: ${(9 / 16) * 100}%;
  position: relative;
  background-color: ${(props) => color(props.theme.light.bg).darken(0.1)};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CardTitle = styled(Typography)`
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LatestUpdateSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="The Latest"
    centeredHeader
    padding="xxl"
  >
    <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gutter="xl">
      {updates.map((update) => (
        <div key={update.url}>
          <Link to={update.url}>
            <CardThumbnail />
          </Link>
          <CardTitle variant="p2">
            <Link to={update.url}>{update.title}</Link>
          </CardTitle>
        </div>
      ))}
    </Grid>
  </Section>
);

export default LatestUpdateSection;
