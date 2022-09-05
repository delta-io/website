import * as React from "react";
import { arrayOf, string } from "prop-types";
import styled from "styled-components";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";

const FeatureContainer = styled.div`
  align-items: center;
  text-align: center;
`;

const Icon = styled.img`
  max-width: 35%;
  margin-left: auto;
  margin-right: auto;
  line-height: 0;
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const FeatureNameContent = styled(Typography)`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  line-height: 110%;
`;

const FeatureDescContent = styled(Typography)`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const KeyFeaturesGrid = (props) => {
  const { features } = props;

  return (
    <Grid columns={{ md: 2, lg: 4 }}>
      {features.map((feature) => (
        <FeatureContainer key={feature.name}>
          <Icon src={feature.image} alt="" />
          <FeatureNameContent>{feature.name}</FeatureNameContent>
          <FeatureDescContent>{feature.description}</FeatureDescContent>
        </FeatureContainer>
      ))}
    </Grid>
  );
};

KeyFeaturesGrid.propTypes = {
  features: arrayOf(string).isRequired,
};

export default KeyFeaturesGrid;
