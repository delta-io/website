import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import before from "./before.png";
import after from "./after.jpg";

const HowItWorksSectionColumn = styled(TypographyContainer)`
  text-align: center;

  img {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
`;

const HowItWorksSection = () => (
  <Section
    title="Need Section Header"
    subtitle={
      <Typography variant="p">
        Together, the features of Delta Lake improve both the manageability and
        performance of working with data in cloud storage objects, and enable a
        “lakehouse” paradigm that combines the key features of data warehouses
        and data lakes: standard DBMS management functions usable against
        low-cost object stores.
      </Typography>
    }
    background="white"
    centeredHeader
    padding="xxl"
  >
    <Grid columns={{ md: 2 }} gutter="xxl">
      <HowItWorksSectionColumn>
        <Typography variant="h5">
          Pipeline using separate storage systems
        </Typography>
        <img src={before} alt="Before" />
      </HowItWorksSectionColumn>
      <HowItWorksSectionColumn>
        <Typography variant="h5">
          Using Delta Lake for both stream and table storage
        </Typography>
        <img src={after} alt="After" />
      </HowItWorksSectionColumn>
    </Grid>
  </Section>
);

export default HowItWorksSection;
