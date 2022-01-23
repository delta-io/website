import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import communityOfficeHoursThumbnail from "./delta-lake-community-ama_20220120.jpg";
import thumbnail2 from "./Delta-Lake-Connector-for-Presto.jpg";
import roadmapThumbnail from "./delta-lake-roadmap-2021h2.jpg";
import daiwtDeltaLakePanelThumbnail from "./DAIWT-EMEA-panel.jpg";

const updates = [
  {
    title: "Delta Lake Community Office Hours (2022-01-20)",
    thumbnail: communityOfficeHoursThumbnail,
    url: "https://youtu.be/A3FY8QLE0-A",
  },
  {
    title: "Delta Lake Connector for Presto",
    thumbnail: thumbnail2,
    url: "https://youtu.be/JrXGkqpl7xk",
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
