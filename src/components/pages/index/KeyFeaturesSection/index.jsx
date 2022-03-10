/* eslint-disable react/no-danger */
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import keyFeaturesImage from "./delta-lake-key-features.png";

const KeyFeaturesSectionColumn = styled(TypographyContainer)`
  text-align: center;

  img {
    width: 100%;
    height: auto;
    max-width: 1600px;
  }
`;

const KeyFeaturesSection = () => (
  <Section
    title="Key Features"
    background="white"
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ md: 1 }} gutter="xxl">
      <KeyFeaturesSectionColumn>
        <img src={keyFeaturesImage} alt="" />
      </KeyFeaturesSectionColumn>
    </Grid>
  </Section>
);

export default KeyFeaturesSection;
