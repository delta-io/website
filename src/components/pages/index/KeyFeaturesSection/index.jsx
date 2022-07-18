/* eslint-disable react/no-danger */
import * as React from "react";
import Section from "src/components/Section";
import KeyFeaturesGrid from "./KeyFeaturesGrid";

const KeyFeaturesSection = () => (
  <Section
    title="Key Features"
    background="white"
    centeredHeader
    padding="xxxl"
  >
    <KeyFeaturesGrid
      features={[
        {
          image: "/images/featureIcons/acid-transactions.png",
          name: "ACID Transactions",
          description:
            "Protect your data with serializability, the strongest level of isolation",
        },
        {
          image: "/images/featureIcons/scalable-metadata.png",
          name: "Scalable Metadata",
          description:
            "Handle petabyte-scale tables with billions of partitions and files with ease",
        },
        {
          image: "/images/featureIcons/time-travel.png",
          name: "Time Travel",
          description:
            "Access/revert to earlier versions of data for audits, rollbacks, or reproduce",
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
        {
          image: "/images/featureIcons/audit-history.png",
          name: "Audit History",
          description:
            "Delta Lake log all change details providing a full audit trail",
        },
        {
          image: "/images/featureIcons/dml-operations.png",
          name: "DML Operations",
          description:
            "SQL, Scala/Java and Python APIs to merge, update and delete datasets",
        },
      ]}
    />
  </Section>
);

export default KeyFeaturesSection;
