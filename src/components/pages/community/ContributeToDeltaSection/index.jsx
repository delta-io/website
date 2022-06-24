import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import organizationsImg from "./organizations-contributed-to-delta.png";

const ContributeToDeltaColumn = styled(TypographyContainer)`
  text-align: center;

  img {
    width: 100%;
    height: auto;
    max-width: 1200px;
  }
`;

const ContributeToDeltaSection = () => (
  <Section
    title="Organizations that have contributed to Delta Lake"
    subtitle={
      <>
        <Typography variant="p">
          Together we have made Delta Lake the most widely used lakehouse format
          in the world!
        </Typography>
      </>
    }
    background="white"
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ md: 1 }} gutter="xxl">
      <ContributeToDeltaColumn>
        <img src={organizationsImg} alt="" />
      </ContributeToDeltaColumn>
    </Grid>
  </Section>
);

export default ContributeToDeltaSection;
