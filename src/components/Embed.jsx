import { arrayOf, number, string } from "prop-types";
import * as React from "react";
import styled from "styled-components";

const embedStyles = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const EmbedContainer = styled.div`
  position: relative;
  padding-top: ${(props) =>
    (props.aspectRatio[1] / props.aspectRatio[0]) * 100}%;
`;

const EmbedImage = styled.img`
  ${embedStyles}
`;

const determineEmbedComponent = (src) => {
  if (/\.(jpe?g|gif|png)/.test(src)) {
    return <EmbedImage src={src} />;
  }

  return <div />;
};

const Embed = (props) => {
  const { aspectRatio, src, maxWidth, className } = props;

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
  src: string.isRequired,
  maxWidth: string,
};

export default Embed;
