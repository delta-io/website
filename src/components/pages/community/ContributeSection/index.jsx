/* eslint-disable react/no-danger */
import * as React from "react";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import ContributeGrid from "./ContributeGrid";

const ContributeSection = () => (
  <Section
    title="Contribute"
    subtitle={
      <>
        <Typography variant="p">
          Help us biuld the simplest, most complete, battle-tested open-source
          storage framework ever! <br />
          Below are a few great ways to get started to contribute.
        </Typography>
      </>
    }
    background="#cdd9f4"
    centeredHeader
    padding="xxxl"
  >
    <ContributeGrid
      features={[
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "delta (Spark)",
          description:
            "An open-source storage framework that enables building a Lakehouse architecture with compute engines including Spark, PrestoDB, Flink, Trino, and Hive and APIs for Scala, Java, Rust, Ruby, and Python",
          url: "https://github.com/delta-io/delta/",
          issue: "https://github.com/delta-io/delta/issues/new/choose",
          PR: "https://github.com/delta-io/delta/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "Delta Connectors",
          description:
            "Connectors for Delta Lake including Hive, Flink, Java Standalone, etc.",
          url: "https://github.com/delta-io/connectors/",
          issue: "https://github.com/delta-io/connectors/issues/new/choose",
          PR: "https://github.com/delta-io/connectors/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "Delta Rust",
          description:
            "A native Rust library for Delta Lake, with bindings into Python and Ruby.",
          url: "https://github.com/delta-io/delta-rs/",
          issue: "https://github.com/delta-io/delta-rs/issues/new/choose",
          PR: "https://github.com/delta-io/delta-rs/pulls",
        },
        {
          image: "/images/featureIcons/open-source.png",
          name: "Open Source",
          description:
            "Community driven, open standards, open protocol, open discussions",
        },
        {
          image: "/images/featureIcons/unified-batch.png",
          name: "Unified Batch/Streaming",
          description:
            "Exactly once semantics ingestion to backfill to interactive queries",
        },
        {
          image: "/images/featureIcons/schema-evolution.png",
          name: "Schema Evolution / Enforcement",
          description: "Prevent bad data from causing data corruption",
        },
      ]}
    />
  </Section>
);

export default ContributeSection;
