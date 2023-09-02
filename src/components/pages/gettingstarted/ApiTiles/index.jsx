import * as React from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import Tiles from "src/components/Tiles";
import rustLogo from "./logos/delta-rust-square.png";
import sparkLogo from "./logos/delta-spark-square.png";
import pythonLogo from "./logos/python-logo.png";
import jupyterLogo from "./logos/1200px-Jupyter_logo.svg.png";

const deltaApis = [
  {
    thumbnail: pythonLogo,
    label: "Python",
    url: "/learn/getting-started-pages/rs-python",
  },
  {
    thumbnail: rustLogo,
    label: "Rust",
    url: "/learn/getting-started-pages/rust",
  },
  {
    thumbnail: sparkLogo,
    label: "PySpark",
    url: "/learn/getting-started-pages/pyspark-shell",
  },
  {
    thumbnail: sparkLogo,
    label: "Spark (Scala)",
    url: "/learn/getting-started-pages/spark-shell",
  },
  {
    thumbnail: jupyterLogo,
    label: "Jupyter",
    url: "/learn/getting-started-pages/jupyterlab-notebook",
  },
  {
    thumbnail: rustLogo,
    label: "ROAPI",
    url: "/learn/getting-started-pages/roapi",
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
