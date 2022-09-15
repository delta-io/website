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
  },
  {
    name: "R. Tyler Croy",
    organization: "Scribd",
    areas: ["delta", "delta-rs", "kafka-delta-ingest"],
  },
  {
    name: "Tathagata Das",
    organization: "Databricks",
    areas: ["delta", "connectors"],
  },
  {
    name: "QP Hou",
    organization: "Neuralink",
    areas: ["delta", "delta-rs"],
  },
  {
    name: "Venki Korukanti",
    organization: "Databricks",
    areas: ["delta", "connectors"],
  },
  {
    name: "Denny Lee",
    organization: "Databricks",
    areas: ["delta", "connectors", "delta-sharing", "delta-rs", "website"],
  },
  {
    name: "Mykhailo Osypov",
    organization: "Scribd",
    areas: ["delta-rs", "kafka-delta-ingest"],
  },
  {
    name: "Allison Portis",
    organization: "Databricks",
    areas: ["delta", "connectors"],
  },
  {
    name: "Scott Sandre",
    organization: "Databricks",
    areas: ["delta", "connectors"],
  },
  {
    name: "Florian Valeye",
    organization: "Backmarket",
    areas: ["delta", "delta-rs"],
  },
  {
    name: "Thomas Vollmer",
    organization: "Microsoft",
    areas: ["delta-rs"],
  },
  {
    name: "Christian Williams",
    organization: "Scribd",
    areas: ["delta", "delta-rs", "kafka-delta-ingest"],
  },
  {
    name: "Ryan Zhu",
    organization: "Databricks",
    areas: ["delta", "connectors", "delta-sharing"],
  },
];

const CommittersTable = styled(Table)`
  margin: 0 auto;
`;

const CurrentCommittersSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="Current Committers"
    subtitle={
      <TypographyContainer>
        <Typography variant="p">
          Want to dive deeper into Delta Lake, please chat with any of our
          committers!
        </Typography>
        <Typography variant="p">
          For more information on how to contribute, please refer to the{" "}
          <Link href="https://github.com/delta-io/delta/blob/master/CONTRIBUTING.md">
            Delta Lake contribution guide
          </Link>
          .
        </Typography>
      </TypographyContainer>
    }
    centeredHeader
    padding="xxxl"
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
