import * as React from "react";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import Link from "src/components/Link";
import Table from "src/components/Table";
import styled from "styled-components";

const committers = [
  {
    name: "Michael Armbrust",
    organization: "Databricks",
    areas: ["delta", "connectors", "delta-sharing"],
    link: "",
  },
  {
    name: "R. Tyler Croy",
    organization: "Scribd",
    areas: ["delta", "delta-rs", "kafka-delta-ingest"],
    link: "",
  },
  {
    name: "Tathagata Das",
    organization: "Databricks",
    areas: ["delta", "connectors"],
    link: "",
  },
  {
    name: "QP Hou",
    organization: "Neuralink",
    areas: ["delta", "delta-rs"],
    link: "",
  },
  {
    name: "Will Jones",
    organization: "Voltron Data",
    areas: ["delta", "delta-rs"],
    link: "",
  },
  {
    name: "Venki Korukanti",
    organization: "Databricks",
    areas: ["delta", "connectors"],
    link: "",
  },
  {
    name: "Denny Lee",
    organization: "Databricks",
    areas: ["delta", "connectors", "delta-sharing", "delta-rs", "website"],
    link: "",
  },
  {
    name: "Mykhailo Osypov",
    organization: "Scribd",
    areas: ["delta-rs", "kafka-delta-ingest"],
    link: "",
  },
  {
    name: "Robert Pack",
    organization: "BASF",
    areas: ["delta", "delta-rs"],
    link: "",
  },
  {
    name: "Allison Portis",
    organization: "Databricks",
    areas: ["delta", "connectors"],
    link: "",
  },
  {
    name: "Scott Sandre",
    organization: "Databricks",
    areas: ["delta", "connectors"],
    link: "",
  },
  {
    name: "Florian Valeye",
    organization: "Backmarket",
    areas: ["delta", "delta-rs"],
    link: "/profiles/florian-valeye",
  },
  {
    name: "Thomas Vollmer",
    organization: "Microsoft",
    areas: ["delta-rs"],
    link: "",
  },
  {
    name: "Christian Williams",
    organization: "Scribd",
    areas: ["delta", "delta-rs", "kafka-delta-ingest"],
    link: "",
  },
  {
    name: "Ryan Zhu",
    organization: "Databricks",
    areas: ["delta", "connectors", "delta-sharing"],
    link: "",
  },
  {
    name: "Gerhard Brueckl",
    organization: "Paiqo GmbH",
    areas: ["delta", "connectors", "delta-sharing"],
    link: "/profiles/gerhard-brueckl",
  },
];

const CommittersTable = styled(Table)`
  margin: 0 auto;
`;

const CurrentCommittersSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="Project Maintainers"
    subtitle={
      <TypographyContainer>
        <Typography variant="p">
          Want to dive deeper into Delta Lake, please chat with any of our
          maintainers!
        </Typography>
        <Typography variant="p">
          For more information on how to contribute, please refer to the{" "}
          <Link href="../resources/contributing-to-delta">
            Delta Lake contribution guide
          </Link>
          .
        </Typography>
      </TypographyContainer>
    }
    centeredHeader
    padding="xxl"
  >
    <CommittersTable
      headers={[
        { label: "Name", field: "name" },
        { label: "Organziation", field: "organization" },
        { label: "Focal Areas", field: "areas" },
      ]}
      data={committers.map((committer) => ({
        ...committer,
        key: committer.name,
        areas: committer.areas.join(", "),
      }))}
    />
  </Section>
);

export default CurrentCommittersSection;
