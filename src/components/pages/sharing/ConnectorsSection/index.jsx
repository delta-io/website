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
import powerbiLogo from "./powerbi.png";

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
  {
    src: powerbiLogo,
    alt: "Power Bi",
    width: 104,
    height: 34,
  },
];

const pandasCode =
  'delta_sharing.<span class="color-blue">load_as_pandas(…)</span>';
const sparkCode =
  'delta_sharing.<span class="color-blue">load_as_spark(…)</span>';

const ConnectorCard = styled(TypographyContainer)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: ${(props) => props.theme.spacing.xl}
    ${(props) => props.theme.spacing.lg};
  text-align: center;

  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`padding: ${props.theme.spacing.xl};`)}

  img {
    margin-bottom: -${(props) => props.theme.spacing.md};
  }

  pre {
    background-color: ${(props) => props.theme.light.bg};
    padding: ${(props) => props.theme.spacing.md};
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

const ConnectorsSection = () => (
  <Section title="Connecting to Delta Sharing" padding="xxxl" centeredHeader>
    <Grid gutter={{ xs: "xl", lg: "xxl" }} columns={{ xs: 1, md: 2 }}>
      <ConnectorCard>
        <Typography variant="p">
          <img src={pandasLogo} alt="Pandas" width="111" height="53" />
        </Typography>
        <Typography variant="p">Load table as Pandas DataFrame</Typography>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: pandasCode }} />
        </pre>
      </ConnectorCard>
      <ConnectorCard>
        <Typography variant="p">
          <img src={sparkLogo} alt="Apache Spark" width="111" height="53" />
        </Typography>
        <Typography variant="p">Load table as Spark DataFrame</Typography>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: sparkCode }} />
        </pre>
      </ConnectorCard>
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

export default ConnectorsSection;
