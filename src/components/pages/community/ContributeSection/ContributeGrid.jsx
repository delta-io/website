import * as React from "react";
import { arrayOf, string } from "prop-types";
import styled from "styled-components";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Typography from "src/components/Typography";

const FeatureContainer = styled.div`
  align-items: left;
  background: white;
  padding: 20px;
  text-align: left;
`;

const Icon = styled.img`
  max-width: 35%;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  line-height: 0;
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const FeatureNameContent = styled(Typography)`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.h3};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  line-height: 110%;
`;

const FeatureDescContent = styled(Typography)`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const FeatureIssueContent = styled(Typography)`
  color: #3766d5;
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin-top: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const ContributeGrid = (props) => {
  const { features } = props;

  return (
    <Grid columns={{ md: 2, lg: 3 }}>
      {features.map((feature) => (
        <FeatureContainer key={feature.url}>
          <Icon src={feature.image} alt="" width="35" />
          <FeatureNameContent>
            <Link href={feature.url} muted>
              {feature.name}
            </Link>
          </FeatureNameContent>
          <Typography variant="p">
            {feature.contributors} contributors | {feature.orgs} organizations
            <br />
          </Typography>
          <FeatureDescContent>
            {feature.description}
            <br />
            &nbsp;
          </FeatureDescContent>
          <FeatureIssueContent>
            <Link href={feature.issue} muted>
              Report an issue
            </Link>
            <br />
            <Link href={feature.PR} muted>
              View Pull Requests
            </Link>
          </FeatureIssueContent>
        </FeatureContainer>
      ))}
    </Grid>
  );
};

ContributeGrid.propTypes = {
  features: arrayOf(string).isRequired,
};

export default ContributeGrid;
