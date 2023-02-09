import React from "react";
import styled from "styled-components";

const Iframe = styled.iframe`
  aspect-ratio: 16/9;
  max-height: 100%;
  max-width: 100%;
  flex-grow: 1;
`;

export const YoutubeEmbed = ({ embedId }) => (
  <Iframe
    src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
