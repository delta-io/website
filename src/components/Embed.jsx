import { string, any } from "prop-types";
import * as React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const embedStyles = `
  // position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;

const EmbedContainer = styled.div`
  aspect-ratio: 16/9;
  img {
    object-fit: cover;
  }
`;

const EmbedImage = styled.img`
  ${embedStyles}
`;

const OtherEmbed = styled.div`
  ${embedStyles}
`;

const determineEmbedComponent = (src, alt = " ") => {
  if (/\.(jpe?g|gif|png)/.test(src)) {
    return <EmbedImage src={src} alt={alt} />;
  }

  return <OtherEmbed>{src}</OtherEmbed>;
};

const Embed = (props) => {
  const { alt, aspectRatio, src, className } = props;

  if (src?.childImageSharp) {
    return (
      <div className={className}>
        <GatsbyImage image={getImage(src)} alt={alt ?? ""} />
      </div>
    );
  }

  const embeddedComponent = determineEmbedComponent(src, alt);

  return (
    <EmbedContainer aspectRatio={aspectRatio}>
      {embeddedComponent}
    </EmbedContainer>
  );
};

Embed.defaultProps = {
  alt: undefined,
};

Embed.propTypes = {
  alt: string,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  src: any,
};

export default Embed;
