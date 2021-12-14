import { arrayOf, object, oneOfType, shape, string } from "prop-types";
import * as React from "react";
import color from "color";
import Embed from "src/components/Embed";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";
import styled from "styled-components";

const CardThumbnail = styled.div`
  background-color: ${(props) => color(props.theme.light.bg).darken(0.1)};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;

const CardTitle = styled(Typography)`
  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ImageStrip = (props) => {
  const { items, className } = props;

  return (
    <Grid
      columns={{ xs: 1, sm: 2, lg: items.length }}
      gutter="xl"
      className={className}
    >
      {items.map((item) => (
        <div key={item.url}>
          <Link href={item.url}>
            <CardThumbnail>
              <Embed src={item.thumbnail} alt="" aspectRatio={[16, 9]} />
            </CardThumbnail>
          </Link>
          <CardTitle variant="p2">
            <Link href={item.url}>{item.title}</Link>
          </CardTitle>
        </div>
      ))}
    </Grid>
  );
};

ImageStrip.propTypes = {
  items: arrayOf(
    shape({
      title: string.isRequired,
      thumbnail: oneOfType([string, object]).isRequired,
      url: string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageStrip;
