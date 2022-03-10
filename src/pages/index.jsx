import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import AnnouncementSection from "src/components/pages/index/AnnouncementSection";
import HeroSection from "src/components/pages/index/HeroSection";
import Link from "src/components/Link";
import DiagramSection from "src/components/pages/index/DiagramSection";
import LatestUpdateSection from "src/components/pages/index/LatestUpdateSection";
// import KeyFeaturesSection from "src/components/pages/shared/KeyFeaturesSection";
import KeyFeaturesSection from "src/components/pages/index/KeyFeaturesSection";
import GetStartedSection from "src/components/pages/index/GetStartedSection";
import OrganizationsSection from "src/components/pages/index/OrganizationsSection";
import WhitepaperSection from "src/components/pages/index/WhitepaperSection";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";

const HomePage = () => (
  <>
    <SEO title="Home" />
    <PageLayout>
      <AnnouncementSection
        title="Announcing Delta Sharing"
        description="An Open Standard for Secure Data Sharing"
        url="/sharing"
      />
      <HeroSection
        title="Build Lakehouses with Delta Lake"
        description={
          <>
            Delta Lake is an open-source storage framework that enables building
            a <br />{" "}
            <Link
              href="http://cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf"
              newTab
            >
              Lakehouse architecture
            </Link>{" "}
            with compute engines including Spark, PrestoDB, Flink, Trino, and
            Hive and APIs for Scala, Java, Rust, Ruby, and Python.
          </>
        }
        ctaLabel="Get Started"
        ctaUrl="/learn/getting-started"
        versionNumber="1.1.0"
      />
      <DiagramSection />
      <LatestUpdateSection />
      <KeyFeaturesSection />
      {/* <KeyFeaturesSection
        features={[
          {
            title: "Delta Sharing",
            description: (
              <>
                <Link to="/sharing">Delta Sharing</Link> is the industry’s first
                open protocol for secure data sharing, making it simple to share
                data with other organizations regardless of which computing
                platforms they use.
              </>
            ),
          },
          {
            title: "ACID Transactions",
            description: (
              <>
                Data lakes typically have multiple data pipelines reading and
                writing data concurrently, and data engineers have to go through
                a tedious process to ensure data integrity, due to the lack of
                transactions. Delta Lake brings ACID transactions to your data
                lakes. It provides serializability, the strongest level of
                isolation level. Learn more at{" "}
                <Link
                  href="https://databricks.com/blog/2019/08/21/diving-into-delta-lake-unpacking-the-transaction-log.html"
                  newTab
                >
                  Diving into Delta Lake: Unpacking the Transaction Log
                </Link>
                .
              </>
            ),
          },
          {
            title: "Scalable Metadata Handling",
            description:
              'In big data, even the metadata itself can be "big data." Delta Lake treats metadata just like data, leveraging Spark\'s distributed processing power to handle all its metadata. As a result, Delta Lake can handle petabyte-scale tables with billions of partitions and files at ease.',
          },
          {
            title: "Time Travel (data versioning)",
            description: (
              <>
                Delta Lake provides snapshots of data enabling developers to
                access and revert to earlier versions of data for audits,
                rollbacks or to reproduce experiments. Learn more in{" "}
                <Link href="https://databricks.com/blog/2019/02/04/introducing-delta-time-travel-for-large-scale-data-lakes.html">
                  Introducing Delta Lake Time Travel for Large Scale Data Lakes
                </Link>
                .
              </>
            ),
          },
          {
            title: "Open Format",
            description:
              "All data in Delta Lake is stored in Apache Parquet format enabling Delta Lake to leverage the efficient compression and encoding schemes that are native to Parquet.",
          },
          {
            title: "Unified Batch and Streaming Source and Sink",
            description:
              "A table in Delta Lake is both a batch table, as well as a streaming source and sink. Streaming data ingest, batch historic backfill, and interactive queries all just work out of the box.",
          },
          {
            title: "Schema Enforcement",
            description: (
              <>
                Delta Lake provides the ability to specify your schema and
                enforce it. This helps ensure that the data types are correct
                and required columns are present, preventing bad data from
                causing data corruption. For more information, refer to{" "}
                <Link href="https://databricks.com/blog/2019/09/24/diving-into-delta-lake-schema-enforcement-evolution.html">
                  Diving Into Delta Lake: Schema Enforcement &amp; Evolution
                </Link>
                .
              </>
            ),
          },
          {
            title: "Schema Evolution",
            description: (
              <>
                Big data is continuously changing. Delta Lake enables you to
                make changes to a table schema that can be applied
                automatically, without the need for cumbersome DDL. For more
                information, refer to{" "}
                <Link href="https://databricks.com/blog/2019/09/24/diving-into-delta-lake-schema-enforcement-evolution.html">
                  Diving Into Delta Lake: Schema Enforcement &amp; Evolution
                </Link>
                .
              </>
            ),
          },
          {
            title: "Audit History",
            description:
              "Delta Lake transaction log records details about every change made to data providing a full audit trail of the changes.",
          },
          {
            title: "Updates and Deletes",
            description: (
              <>
                Delta Lake supports Scala, Java, Python, and SQL APIs to merge,
                update and delete datasets. This allows you to easily comply
                with GDPR and CCPA and also simplifies use cases like change
                data capture. For more information, refer to{" "}
                <Link href="https://databricks.com/blog/2019/08/02/announcing-delta-lake-0-3-0-release.html">
                  Announcing the Delta Lake 0.3.0 Release
                </Link>{" "}
                and{" "}
                <Link href="https://databricks.com/blog/2019/10/03/simple-reliable-upserts-and-deletes-on-delta-lake-tables-using-python-apis.html">
                  Simple, Reliable Upserts and Deletes on Delta Lake Tables
                  using Python APIs
                </Link>{" "}
                which includes code snippets for merge, update, and delete DML
                commands.
              </>
            ),
          },
          {
            title: "100% Compatible with Apache Spark API",
            description:
              "Developers can use Delta Lake with their existing data pipelines with minimal change as it is fully compatible with Spark, the commonly used big data processing engine.",
          },
          {
            title: "Delta Everywhere",
            description: (
              <>
                Use the language, services, connectors, or database of your
                choice with Delta Lake with{" "}
                <Link href="/connectors">connectors</Link> including Rust,
                Python, DBT, Hive, Presto, and more!
              </>
            ),
          },
        ]}
      /> */}
      <GetStartedSection
        ctaLabel="Get Started"
        ctaUrl="/learn/getting-started"
      />
      <OrganizationsSection />
      <WhitepaperSection />
      <CommunitySection />
      <ProjectGovernanceSection />
    </PageLayout>
  </>
);

export default HomePage;
