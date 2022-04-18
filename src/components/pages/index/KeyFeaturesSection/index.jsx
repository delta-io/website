/* eslint-disable react/no-danger */
import * as React from "react";
import Section from "src/components/Section";
import KeyFeaturesGrid from "src/components/pages/shared/KeyFeaturesGrid";

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
          image: "/images/featureIcons/acid_trans.png",
          name: "ACID Transactions",
          description:
            "Protect your data with serializability, the strongest level of isolation",
          link: "https://databricks.com/blog/2019/08/21/diving-into-delta-lake-unpacking-the-transaction-log.html",
        },
        {
          image: "/images/featureIcons/scale_meta.png",
          name: "Scalable Metadata",
          description:
            "Handle petabyte-scale tables with billions of partitions and files with ease",
          link: "",
        },
        {
          image: "/images/featureIcons/time_travel.png",
          name: "Time Travel",
          description:
            "Access/revert to earlier versions of data for audits, rollbacks, or reproduce",
          link: "https://databricks.com/blog/2019/02/04/introducing-delta-time-travel-for-large-scale-data-lakes.html",
        },
        {
          image: "/images/featureIcons/open_source.png",
          name: "Open Source",
          description:
            "Community driven, open standards, open protocol, open discussions",
          link: "",
        },
        {
          image: "/images/featureIcons/batch_stream.png",
          name: "Unified Batch/Streaming",
          description:
            "Exactly once semantics ingestion to backfill to interactive queries",
          link: "",
        },
        {
          image: "/images/featureIcons/schem_evo.png",
          name: "Schema Evolution / Enforcement",
          description: "Prevent bad data from causing data corruption",
          link: "https://databricks.com/blog/2019/09/24/diving-into-delta-lake-schema-enforcement-evolution.html",
        },
        {
          image: "/images/featureIcons/audit_history.png",
          name: "Audit History",
          description:
            "Delta Lake log all change details providing a fill audit trail",
          link: "",
        },
        {
          image: "/images/featureIcons/dml_ops.png",
          name: "DML Operations",
          description:
            "SQL, Scala/Java and Python APIs to merge, update and delete datasets",
          link: "",
        },
      ]}
    />
  </Section>
);

export default KeyFeaturesSection;
