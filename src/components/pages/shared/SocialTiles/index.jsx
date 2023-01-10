import * as React from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import Tiles from "src/components/Tiles";
import slack from "./logos/slack.png";
import googleGroups from "./logos/google-groups.png";
import youtube from "./logos/youtube.png";
import linkedin from "./logos/linkedin.png";
import spotify from "./logos/d3l2-crab-spotify.png";

const communities = [
  {
    thumbnail: slack,
    label: "Slack",
    url: "https://go.delta.io/slack",
  },
  {
    thumbnail: googleGroups,
    label: "Google Groups",
    url: "https://go.delta.io/groups",
  },
  {
    thumbnail: linkedin,
    label: "LinkedIn",
    url: "https://go.delta.io/linkedin",
  },
  {
    thumbnail: youtube,
    label: "YouTube",
    url: "https://go.delta.io/youtube",
  },
  {
    thumbnail: spotify,
    label: "D3L2 | Spotify",
    url: "https://go.delta.io/spotify",
  },
];

const CenteredSocialTiles = styled(Tiles)`
  justify-content: center;
`;

const SocialTiles = (props) => {
  const { dark, alignCenter } = props;

  const TilesComponent = alignCenter ? CenteredSocialTiles : Tiles;

  return (
    <TilesComponent
      columns={{
        xs: 1,
        md: communities.map(() => "140px"),
      }}
      gutter="xl"
      maxImageWidth={65}
      tiles={communities}
      dark={dark}
      showLabels
    />
  );
};

SocialTiles.defaultProps = {
  dark: undefined,
  alignCenter: undefined,
};

SocialTiles.propTypes = {
  dark: bool,
  alignCenter: bool,
};

export default SocialTiles;
