import { arrayOf, number, string, any } from "prop-types";
import * as React from "react";
import styled from "styled-components";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

const embedStyles = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const EmbedContainer = styled.div`
  position: relative;
  ${(props) =>
    !props.src?.childImageSharp &&
    `padding-top: ${(props.aspectRatio[1] / props.aspectRatio[0]) * 100}%;`}
`;

const EmbedImage = styled(StaticImage)`
  ${embedStyles}
`;

const OtherEmbed = styled.div`
  ${embedStyles}
`;

const determineEmbedComponent = (src) => {
  if (/\.(jpe?g|gif|png)/.test(src)) {
    return <EmbedImage src={src} />;
  }

  return <OtherEmbed>{src}</OtherEmbed>;
};

const Embed = (props) => {
  const { aspectRatio, src, maxWidth, className } = props;

  if (src?.childImageSharp) {
    return (
      <div className={className}>
        <GatsbyImage image={getImage(src)} />
      </div>
    );
  }

  const embeddedComponent = determineEmbedComponent(src);

  return (
    <div className={className} style={{ maxWidth }}>
      <EmbedContainer aspectRatio={aspectRatio}>
        {embeddedComponent}
      </EmbedContainer>
    </div>
  );
};

Embed.defaultProps = {
  maxWidth: "none",
};

Embed.propTypes = {
  aspectRatio: arrayOf(number.isRequired).isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  src: any,
  maxWidth: string,
};

export default Embed;
