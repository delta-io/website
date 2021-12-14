import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
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

const CenteredImageStrip = styled(ImageStrip)`
  text-align: center;
`;

const LatestUpdateSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="The Latest"
    titleSize="h5"
    centeredHeader
    padding="xxxl"
  >
    <CenteredImageStrip items={updates} />
  </Section>
);

export default LatestUpdateSection;
