import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  iframe {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;

export function YoutubeEmbed({ embedId }) {
  return (
    <Wrapper>
      <iframe
        src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Wrapper>
  );
}
