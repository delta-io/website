import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import thumbnail4 from "./d3l2-ryan_harris.png";
import thumbnail3 from "./unified-source-interface.png";
import thumbnail2 from "./community-office-hours_20220818.png";
import thumbnail1 from "./michael-armbrust-keynote.png";

const updates = [
  {
    title: "D3L2: Cybersecurity, Data Mesh, and Delta Lake at HSBC",
    thumbnail: thumbnail4,
    url: "https://youtu.be/ctKctx7vGW4",
  },
  {
    title: "Community AMA (2022-08-18)",
    thumbnail: thumbnail2,
    url: "https://www.youtube.com/watch?v=lBr0UN7BEac&t=1s",
  },
  {
    title: "Apache Flink Source Connector for Delta Lake tables",
    thumbnail: thumbnail3,
    url: "/blog/2022-08-11-apache-flink-source-connector-for-delta-lake-tables/",
  },
  {
    title: "Delta Lake 2.0 - The Foundation of your Data Lakehouse is Open",
    thumbnail: thumbnail1,
    url: "/blog/2022-08-02-delta-2-0-the-foundation-of-your-data-lake-is-open/",
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
