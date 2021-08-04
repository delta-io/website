import { arrayOf, shape, string, node } from "prop-types";
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";

const KeyFeatureGrid = styled(Grid)`
  margin-bottom: ${(props) => props.theme.spacing.xxl};

  ${(props) =>
    props.theme.mediaBreakpointUp("md")(`
    margin-bottom: ${props.theme.spacing.lg};
  `)}
`;

const KeyFeature = (props) => {
  const { title, description } = props;

  return (
    <KeyFeatureGrid
      columns={{ xs: 1, md: [1, 2], xl: [1, 3] }}
      gutter={{ md: "xl" }}
    >
      <Typography variant="p">
        <strong>{title}</strong>
      </Typography>
      <Typography variant="p">{description}</Typography>
    </KeyFeatureGrid>
  );
};

const KeyFeaturesSection = (props) => {
  const { features } = props;

  return (
    <Section
      title="Key Features"
      padding="xxl"
      centeredHeader
      background="white"
    >
      {features.map((feature) => (
        <KeyFeature
          key={feature.title}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </Section>
  );
};

KeyFeaturesSection.propTypes = {
  features: arrayOf(
    shape({
      title: string.isRequired,
      description: node.isRequired,
    })
  ).isRequired,
};

export default KeyFeaturesSection;
