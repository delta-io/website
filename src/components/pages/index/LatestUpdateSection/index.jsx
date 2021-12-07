import color from "color";
import Link from "src/components/Link";
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";
import communityOfficeHoursThumbnail from "./delta-lake-community-ama_20211111.jpg";
import roadmapThumbnail from "./delta-lake-roadmap-2021h2.jpg";
import daiwtDeltaLakePanelThumbnail from "./DAIWT-EMEA-panel.jpg";
import whyDataEatingUniverseThumbnail from "./why-data-eating-universe.jpg";

const updates = [
  {
    title: "Delta Lake Community Office Hours",
    thumbnail: communityOfficeHoursThumbnail,
    url: "https://www.youtube.com/watch?v=SOgI8gx1tjE",
  },
  {
    title: "Delta Lake Roadmap 2021 H2",
    thumbnail: roadmapThumbnail,
    url: "https://www.youtube.com/watch?v=NBcn2J6V-MM",
  },
  {
    title: "DAIWT: Delta Lake EMEA Panel",
    thumbnail: daiwtDeltaLakePanelThumbnail,
    url: "https://youtu.be/atS-9yCjo68?t=2125",
  },
  {
    title: "Why Data is Eating the Universe",
    thumbnail: whyDataEatingUniverseThumbnail,
    url: "https://www.youtube.com/watch?v=o6lUFUxlois",
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
    titleSize="h5"
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gutter="xl">
      {updates.map((update) => (
        <div key={update.url}>
          <Link href={update.url}>
            <CardThumbnail>
              <img src={update.thumbnail} alt="" />
            </CardThumbnail>
          </Link>
          <CardTitle variant="p2">
            <Link href={update.url}>{update.title}</Link>
          </CardTitle>
        </div>
      ))}
    </Grid>
  </Section>
);

export default LatestUpdateSection;
