/* eslint-disable react/no-danger */
import * as React from "react";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import ContributeGrid from "./ContributeGrid";

const CenterTextSectionColumn = styled(TypographyContainer)`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
`;

const TextSectionColumn = styled(TypographyContainer)`
  text-align: left;

  img {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
`;

const ContributeSection = () => (
  <Section
    title="Contribute"
    subtitle={
      <Typography variant="p">
        Help us build the simplest, most complete, battle-tested open-source
        storage framework ever! <br />
        Below are a few great ways to get started to contribute.
      </Typography>
    }
    background="#cdd9f4"
    centeredHeader
    padding="xl"
  >
    <ContributeGrid
      features={[
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "Delta",
          description:
            "Delta Lake connector for Apache Spark™ with Scala/Java and Python APIs.",
          contributors: "192",
          orgs: "43",
          url: "https://github.com/delta-io/delta/",
          issue: "https://github.com/delta-io/delta/issues/new/choose",
          PR: "https://github.com/delta-io/delta/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "Delta Connectors",
          description:
            "Delta Lake connectors for non-Spark engines like Hive, Flink, Java, etc.",
          contributors: "21",
          orgs: "9",
          url: "https://github.com/delta-io/connectors/",
          issue: "https://github.com/delta-io/connectors/issues/new/choose",
          PR: "https://github.com/delta-io/connectors/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "Delta Rust",
          description:
            "Delta Lake connector written natively in Rust, with Python and Ruby bindings.",
          contributors: "50",
          orgs: "26",
          url: "https://github.com/delta-io/delta-rs/",
          issue: "https://github.com/delta-io/delta-rs/issues/new/choose",
          PR: "https://github.com/delta-io/delta-rs/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "Delta Sharing",
          description: "An open protocol for simple and secure data sharing.",
          contributors: "19",
          orgs: "2",
          url: "https://github.com/delta-io/delta-sharing",
          issue: "https://github.com/delta-io/delta-sharing/issues/new/choose",
          PR: "https://github.com/delta-io/delta-sharing/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "kafka-delta-ingest",
          description:
            "Delta Lake connector for streaming data from Kafka into Delta tables.",
          contributors: "6",
          orgs: "2",
          url: "https://github.com/delta-io/kafka-delta-ingest",
          issue:
            "https://github.com/delta-io/kafka-delta-ingest/issues/new/choose",
          PR: "https://github.com/delta-io/kafka-delta-ingest/pulls",
        },
        {
          image: "/images/featureIcons/github_2048_black.png",
          name: "delta.io website",
          description:
            "Delta Lake website and documentation built on Gatsby.js framework.",
          contributors: "7",
          orgs: "3",
          url: "https://github.com/delta-io/website/",
          issue: "https://github.com/delta-io/website/issues/new/choose",
          PR: "https://github.com/delta-io/website/pulls",
        },
      ]}
    />

    <Grid columns={{ md: 1 }} gutter="xxl">
      <CenterTextSectionColumn>
        <Typography variant="p">
          Refer to the &nbsp;
          <Link href="../resources/contributing-to-delta">
            Delta Lake contribution guide
          </Link>
          &nbsp; for the latest on communication, coding style, and how to sign
          your work.
          <br />
          <br />
          Refer to the &nbsp;
          <Link href="https://github.com/delta-io/delta/blob/master/PROTOCOL.md">
            Delta Lake Protocol
          </Link>
          &nbsp; for the specification for the Delta Transaction Protocol, which
          brings &nbsp;
          <Link href="https://en.wikipedia.org/wiki/ACID">ACID properties</Link>
          &nbsp; to large collections of data, stored as files, in a distributed
          file system or object store.
        </Typography>
      </CenterTextSectionColumn>
    </Grid>

    <Grid columns={{ md: 1 }} gutter="xxl">
      <CenterTextSectionColumn>
        <Typography variant="h3">Want to help or to help out?</Typography>
        <Typography variant="p">
          Looking for ways to help or to get help? Refer to the &nbsp;
          <Link href="../resources/getting-help">Getting Help Guide</Link>.
        </Typography>
      </CenterTextSectionColumn>
    </Grid>

    <Grid columns={{ md: 1 }} gutter="xxl">
      <CenterTextSectionColumn>
        <Typography variant="h3">Governance</Typography>
      </CenterTextSectionColumn>
    </Grid>

    <Grid columns={{ md: 2 }} gutter="xxl">
      <TextSectionColumn>
        <Typography variant="p">
          Delta Lake is an independent open-source project and not controlled by
          any single company. To emphasize this we joined the Delta Lake Project
          in 2019, which is a sub-project of the Linux Foundation Projects.
          Within the project, we make decisions based on{" "}
          <a href="https://delta.io/pdfs/delta-charter.pdf">these rules</a>.
        </Typography>
      </TextSectionColumn>
      <TextSectionColumn>
        <Typography variant="p">
          Delta Lake is supported by a wide set of developers from over 70
          organizations across multiple repositories. Since 2019, more than 190
          developers have contributed to Delta Lake! The Delta Lake community is
          growing by leaps and bounds with more than 6200 members in the{" "}
          <a href="https://go.delta.io/slack">Delta Users slack</a>.
        </Typography>
      </TextSectionColumn>
    </Grid>
    <Grid columns={{ md: 1 }} gutter="xxl">
      <CenterTextSectionColumn>
        <Typography variant="p">
          For more information, please refer to the{" "}
          <a href="https://delta.io/pdfs/delta-charter.pdf">
            founding technical charter
          </a>
          .
        </Typography>
      </CenterTextSectionColumn>
    </Grid>
  </Section>
);

export default ContributeSection;
