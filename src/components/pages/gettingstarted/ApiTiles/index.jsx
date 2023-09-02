import * as React from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import Tiles from "src/components/Tiles";
import rustLogo from "./logos/delta-rust-square.png";
import sparkLogo from "./logos/delta-spark-square.png";
import pythonLogo from "./logos/python-logo.png";
import jupyterLogo from "./logos/1200px-Jupyter_logo.svg.png";
import dockerLogo from "./logos/docker-logo.png";

const deltaApis = [
  {
    thumbnail: pythonLogo,
    label: "Python",
    url: "/learn/getting-started-rs-python",
  },
  {
    thumbnail: rustLogo,
    label: "Rust",
    url: "https://docs.rs/deltalake/latest/deltalake/",
  },
  {
    thumbnail: sparkLogo,
    label: "Apache Spark",
    url: "https://docs.delta.io",
  },
  {
    thumbnail: jupyterLogo,
    label: "Jupyter",
    url: "https://jupyter.org",
  },
  {
    thumbnail: dockerLogo,
    label: "Docker",
    url: "https://go.delta.io/docker",
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
