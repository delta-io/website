import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import thumbnail4 from "./extending-delta-sharing.png";
import thumbnail3 from "./ama_2022-03-03.jpg";
import thumbnail2 from "./ama_2022-02-17.jpg";
import thumbnail1 from "./delta-lake-roadmap-2021h2.jpg";

const updates = [
  {
    title: "Extending Delta Sharing to Google Cloud Storage",
    thumbnail: thumbnail4,
    url: "https://delta.io/blog/2022-03-11-delta-sharing-0-4-0-released/",
  },
  {
    title: "Community AMA (2022-03-03)",
    thumbnail: thumbnail3,
    url: "https://www.youtube.com/watch?v=-KBbECH-oKQ",
  },
  {
    title: "Community AMA (2022-02-17)",
    thumbnail: thumbnail2,
    url: "https://www.youtube.com/watch?v=oc1mlhtsyPg",
  },
  {
    title: "Delta Lake Roadmap 2021 H2",
    thumbnail: thumbnail1,
    url: "https://www.youtube.com/watch?v=NBcn2J6V-MM",
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
