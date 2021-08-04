import * as React from "react";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";
import styled from "styled-components";
import { Link } from "gatsby";
import LakeSection from "../LakeSection";
import slack from "./logos/slack.png";
import googleGroups from "./logos/google-groups.png";
import youtube from "./logos/youtube.png";

const communities = [
  {
    logo: slack,
    name: "Slack Channel",
    url: "#",
  },
  {
    logo: googleGroups,
    name: "Google Group",
    url: "#",
  },
  {
    logo: youtube,
    name: "YouTube",
    url: "#",
  },
];

const CommunityTile = styled(Link)`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.primary};
  background-color: white;
  padding: ${(props) => props.theme.spacing.lg};
  text-align: center;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  color: ${(props) => props.theme.light.color};

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 65px;
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const CommunitySection = () => (
  <LakeSection
    title="Join the Delta Lake Community"
    subtitle={
      <Typography variant="p">
        Communicate with fellow Delta Lake users and contributors, ask questions
        and share tips.
      </Typography>
    }
    padding="xxl"
    centeredHeader
  >
    <Grid columns={communities.length} gutter="xl">
      {communities.map((community) => (
        <CommunityTile key={community.name} to={community.url}>
          <img src={community.logo} alt={community.name} />
          {community.name}
        </CommunityTile>
      ))}
    </Grid>
  </LakeSection>
);

export default CommunitySection;
