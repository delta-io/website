import * as React from "react";
import { arrayOf, string } from "prop-types";
import styled from "styled-components";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";

const FeatureContainer = styled.div`
  align-items: center;
`;

const Feature = styled(Link)`
  display: block;
  text-align: center;
  overflow: hidden;
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
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  line-height: 110%;
`;

const FeatureDescContent = styled(Typography)`
  color: ${(props) => props.theme.colors.text};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const KeyFeaturesGrid = (props) => {
  const { features } = props;

  return (
    <Grid columns={{ md: 2, lg: 4 }}>
      {features.map((feature) => (
        <FeatureContainer>
          <Feature key={feature.name} href={`${feature.link}`} muted>
            <Icon src={feature.image} alt="" />
            <FeatureNameContent>{feature.name}</FeatureNameContent>
            <FeatureDescContent>{feature.description}</FeatureDescContent>
          </Feature>
        </FeatureContainer>
      ))}
    </Grid>
  );
};

KeyFeaturesGrid.propTypes = {
  features: arrayOf(string).isRequired,
};

export default KeyFeaturesGrid;
