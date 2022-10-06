import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import thumbnail4 from "./d3l2-ryan_harris.png";
import thumbnail1 from "./tmo-why-lakehouse-delta-lake.png";
import thumbnail0 from "./generic-thumbnail.png";
import thumbnailRestore from "./restore.png";

const updates = [
  {
    title: "How to Rollback a Delta Lake to a Previous Version with Restore",
    thumbnail: thumbnailRestore,
    url: "/blog/2022-10-03-rollback-delta-lake-restore/",
  },
  {
    title: "Converting from Parquet to Delta Lake",
    thumbnail: thumbnail0,
    url: "/blog/2022-09-23-convert-parquet-to-delta/",
  },
  {
    title:
      "Why we migrated to a Data Lakehouse on Delta Lake for T-Mobile Data Science and Analytics Team",
    thumbnail: thumbnail1,
    url: "/blog/2022-09-14-why-migrate-lakehouse-delta-lake-tmo-dsna/",
  },
  {
    title: "D3L2: Cybersecurity, Data Mesh, and Delta Lake at HSBC",
    thumbnail: thumbnail4,
    url: "https://youtu.be/ctKctx7vGW4",
  },
  {
    title: "How to drop columns from a Delta Lake table",
    thumbnail: thumbnail0,
    url: "/blog/2022-08-29-delta-lake-drop-column/",
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
