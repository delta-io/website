/* eslint-disable react/no-danger */
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";

import prestoLogo from "./prestodb-logo.png";
import flinkLogo from "./flink_logo.png";
import hiveLogo from "./hive.png";
import snowflakeLogo from "./snowflake.png";

import trinoLogo from "./trinoWordsGray.png";
import bqLogo from "./bqWordsGray.png";
import airbyteLogo from "./airbyteWordsGray.png";

const integrationLogos = [
  {
    src: prestoLogo,
    alt: "Presto",
    width: 50, // 108,
    height: 50, // 34,
    url: "https://github.com/prestodb/presto/blob/master/presto-docs/src/main/sphinx/connector/deltalake.rst",
  },
  {
    src: flinkLogo,
    alt: "Flink",
    width: 50,
    height: 50,
    url: "https://github.com/delta-io/connectors/tree/master/flink-connector/",
  },
  {
    src: hiveLogo,
    alt: "Hive",
    width: 57,
    height: 51,
    url: "https://github.com/delta-io/connectors",
  },
  {
    src: snowflakeLogo,
    alt: "Snowflake",
    width: 50,
    height: 50,
    url: "https://docs.delta.io/latest/snowflake-integration.html",
  },
];

const comingSoonLogos = [
  {
    src: trinoLogo,
    alt: "Trino",
    width: 99,
    height: 46,
  },
  {
    src: bqLogo,
    alt: "Big Query",
    width: 145,
    height: 50,
  },
  {
    src: airbyteLogo,
    alt: "Airbyte",
    width: 182,
    height: 50,
  },
];

const ComingSoonTitle = styled(Typography)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ComingSoonLogosGrid = styled(Grid)`
  justify-content: center;
  align-items: center;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;
const IntegrationsSection = () => (
  <Section title="Integrations With" padding="xxl" centeredHeader>
    <ComingSoonLogosGrid
      columns={{
        xs: Array(2).fill("min-content"),
        md: Array(4).fill("min-content"),
      }}
      gutter="xl"
    >
      {integrationLogos.map((logo) => (
        <a href={logo.url}>
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
        </a>
      ))}
    </ComingSoonLogosGrid>
    <ComingSoonTitle variant="h5">and more are coming soon!</ComingSoonTitle>
    <ComingSoonLogosGrid
      columns={{
        xs: Array(2).fill("min-content"),
        md: Array(4).fill("min-content"),
      }}
      gutter="xl"
    >
      {comingSoonLogos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
        />
      ))}
    </ComingSoonLogosGrid>
  </Section>
);

export default IntegrationsSection;
