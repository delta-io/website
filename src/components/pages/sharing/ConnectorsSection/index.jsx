/* eslint-disable react/no-danger */
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import pandasLogo from "./pandas.png";
import sparkLogo from "./spark.png";
import prestoLogo from "./presto.png";
import trinoLogo from "./trino.png";
import rustLogo from "./rust.png";
import hiveLogo from "./hive.png";
import tableauLogo from "./tableau.png";
import powerBiLogo from "./powerbi.png";

const comingSoonLogos = [
  {
    src: prestoLogo,
    alt: "Presto",
    width: 108,
    height: 34,
  },
  {
    src: trinoLogo,
    alt: "Trino",
    width: 99,
    height: 46,
  },
  {
    src: rustLogo,
    alt: "Rust",
    width: 49,
    height: 50,
  },
  {
    src: hiveLogo,
    alt: "Hive",
    width: 57,
    height: 51,
  },
  {
    src: tableauLogo,
    alt: "Tableau",
    width: 119,
    height: 24,
  },
];

const ConnectorCard = styled(TypographyContainer)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: ${(props) => props.theme.spacing.lg}
    ${(props) => props.theme.spacing.md};
  text-align: center;

  img {
    margin-bottom: -${(props) => props.theme.spacing.md};
  }

  pre {
    background-color: ${(props) => props.theme.light.bg};
    padding: ${(props) => props.theme.spacing.sm};
    font-size: ${(props) => props.theme.fontSizes.primary};
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  .color-blue {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ComingSoonTitle = styled(Typography)`
  text-align: center;
  margin-top: 80px;
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

const connectors = [
  {
    name: "Pandas",
    description: "Load table as Pandas DataFrame",
    logo: pandasLogo,
    code: 'delta_sharing.<span class="color-blue">load_as_pandas(…)</span>',
  },
  {
    name: "Apache Spark",
    description: "Load table as Spark DataFrame",
    logo: sparkLogo,
    code: 'delta_sharing.<span class="color-blue">load_as_spark(…)</span>',
  },
  {
    name: "Power BI",
    description: "Load directly into Power BI",
    logo: powerBiLogo,
    code: false,
  },
];

const ConnectorsSection = () => (
  <Section title="Connecting to Delta Sharing" padding="xxxl" centeredHeader>
    <Grid gutter="xl" columns={{ xs: 1, md: 2, xl: 3 }}>
      {connectors.map((connector) => (
        <ConnectorCard key={connector.name}>
          <Typography variant="p">
            <img
              src={connector.logo}
              alt={connector.name}
              width="111"
              height="53"
            />
          </Typography>
          <Typography variant="p">{connector.description}</Typography>
          {connector.code && (
            <pre>
              <code dangerouslySetInnerHTML={{ __html: connector.code }} />
            </pre>
          )}
        </ConnectorCard>
      ))}
    </Grid>
    <ComingSoonTitle variant="h5">and more are coming soon!</ComingSoonTitle>
    <ComingSoonLogosGrid
      columns={{
        xs: Array(2).fill("min-content"),
        sm: Array(3).fill("min-content"),
        md: Array(6).fill("min-content"),
      }}
      gutter="xl"
    >
      {comingSoonLogos.map((logo) => (
        <img
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
        />
      ))}
    </ComingSoonLogosGrid>
  </Section>
);

export default ConnectorsSection;
