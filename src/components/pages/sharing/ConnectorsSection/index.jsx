/* eslint-disable react/no-danger */
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import pandasLogo from "./pandas.png";
import sparkLogo from "./spark.png";
import powerBiLogo from "./powerbi.png";

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
  </Section>
);

export default ConnectorsSection;
