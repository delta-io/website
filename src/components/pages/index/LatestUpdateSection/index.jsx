import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import schemaEnforcement from "./schemaEnforcement.png";
import deltaSharing from "./deltaSharing.png";
import pysparkSaveModes from "./pysparkSaveModes.png";
import deltaConstraints from "./deltaConstraints.png";
import deleteRows from "./deleteRows.png";

const updates = [
  {
    title: "Data Sharing across Government Agencies using Delta Sharing",
    thumbnail: deltaSharing,
    url: "/blog/2022-12-08-data-sharing-across-government-delta-sharing/",
  },
  {
    title: "How to Delete Rows from a Delta Lake Table",
    thumbnail: deleteRows,
    url: "/blog/2022-12-07-delete-rows-from-delta-lake-table/",
  },
  {
    title: "Delta Lake Constraints and Checks",
    thumbnail: deltaConstraints,
    url: "/blog/2022-11-21-delta-lake-contraints-check/",
  },
  {
    title: "Delta Lake Schema Enforcement",
    thumbnail: schemaEnforcement,
    url: "/blog/2022-11-16-delta-lake-schema-enforcement/",
  },
  {
    title:
      "Why PySpark append and overwrite write operations are safer in Delta Lake than Parquet tables",
    thumbnail: pysparkSaveModes,
    url: "/blog/2022-11-01-pyspark-save-mode-append-overwrite-error/",
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
