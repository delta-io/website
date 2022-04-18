import * as React from "react";
import { arrayOf, string } from "prop-types";
import styled from "styled-components";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";

const ValuePropContainer = styled.div`
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

const ValuePropName = styled(Typography)`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  line-height: 110%;
`;

const ValuePropContent = styled(Typography)`
  color: white;
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const ValuePropsGrid = (props) => {
  const { features } = props;

  return (
    <Grid columns={{ md: 2, lg: 4 }}>
      {features.map((feature) => (
        <ValuePropContainer>
          <Icon src={feature.image} alt="" />
          <ValuePropName>{feature.name}</ValuePropName>
          <ValuePropContent>{feature.description}</ValuePropContent>
        </ValuePropContainer>
      ))}
    </Grid>
  );
};

ValuePropsGrid.propTypes = {
  features: arrayOf(string).isRequired,
};

export default ValuePropsGrid;
