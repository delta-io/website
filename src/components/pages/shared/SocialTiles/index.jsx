import * as React from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import Tiles from "src/components/Tiles";
import slack from "./logos/slack.png";
import googleGroups from "./logos/google-groups.png";
import youtube from "./logos/youtube.png";
import linkedin from "./logos/linkedin.png";

const communities = [
  {
    thumbnail: slack,
    label: "Slack Channel",
    url: "https://go.delta.io/slack",
  },
  {
    thumbnail: googleGroups,
    label: "Google Group",
    url: "https://groups.google.com/forum/#!forum/delta-users",
  },
  {
    thumbnail: linkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/company/deltalake",
  },

  {
    thumbnail: youtube,
    label: "YouTube",
    url: "http://youtube.com/c/deltalake",
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
        md: communities.map(() => "160px"),
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
