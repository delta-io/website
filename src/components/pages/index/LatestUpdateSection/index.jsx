import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import thumbnail0 from "./generic-thumbnail.png";
import thumbnailRestore from "./restore.png";
import thumbnailDeltaSharingCDF from "./delta-sharing-cdf.png";
import versionPandasDataset from "./versionPandasDataset.png";
import howToCreateDeltaLakeTable from "./create-delta-lake-table.png";

const updates = [
  {
    title: "How to Create Delta Lake tables",
    thumbnail: howToCreateDeltaLakeTable,
    url: "/blog/2022-10-25-create-delta-lake-tables/",
  },
  {
    title: "How to Version Your Data with pandas and Delta Lake",
    thumbnail: versionPandasDataset,
    url: "/blog/2022-10-15-version-pandas-dataset/",
  },
  {
    title: "Sharing a Delta Table’s Change Data Feed with Delta Sharing 0.5.0",
    thumbnail: thumbnailDeltaSharingCDF,
    url: "/blog/2022-10-10-delta-sharing-0-5-0-released/",
  },
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
