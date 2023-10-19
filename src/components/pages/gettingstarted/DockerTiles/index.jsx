import * as React from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import Tiles from "src/components/Tiles";
import dockerLogo from "./logos/docker-logo.png";
import githubLogo from "./logos/github_2048_black.png";

const deltaApis = [
  {
    thumbnail: dockerLogo,
    label: "DockerHub",
    url: "/learn/docker-pages/docker-hub",
  },
  {
    thumbnail: dockerLogo,
    label: "Docker Build",
    url: "/learn/docker-pages/docker-build",
  },
  {
    thumbnail: githubLogo,
    label: "Delta Lake GitHub",
    url: "http://github.com/delta-io/delta/",
  },
  {
    thumbnail: githubLogo,
    label: "delta-rs GitHub",
    url: "http://github.com/delta-io/delta-rs/",
  },
];

const CenteredApiTiles = styled(Tiles)`
  justify-content: center;
`;

const ApiTiles = (props) => {
  const { dark, alignCenter } = props;

  const TilesComponent = alignCenter ? CenteredApiTiles : Tiles;

  return (
    <TilesComponent
      columns={{
        xs: 1,
        md: deltaApis.map(() => "150px"),
      }}
      gutter="xl"
      maxImageWidth={75}
      tiles={deltaApis}
      dark={dark}
      showLabels
    />
  );
};

ApiTiles.defaultProps = {
  dark: undefined,
  alignCenter: undefined,
};

ApiTiles.propTypes = {
  dark: bool,
  alignCenter: bool,
};

export default ApiTiles;
