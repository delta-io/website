import * as React from "react";
import { bool, number } from "prop-types";
import Tiles from "src/components/Tiles";
import useDataList from "src/hooks/useDataList";

const OrganizationTiles = (props) => {
  const { first, columns, dark } = props;
  const logos = useDataList("organizationLogos");

  const logoTiles = first ? logos.slice(0, first) : logos;

  return (
    <Tiles
      columns={columns}
      evenRows
      tiles={logoTiles.map((logo) => ({
        thumbnail: logo.logo,
        label: logo.name,
      }))}
      dark={dark}
    />
  );
};

OrganizationTiles.defaultProps = {
  first: undefined,
  dark: false,
};

OrganizationTiles.propTypes = {
  columns: Tiles.propTypes.columns.isRequired,
  first: number,
  dark: bool,
};

export default OrganizationTiles;
