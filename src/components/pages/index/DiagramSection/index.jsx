import * as React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import deltaDiagramTop from "./delta-hp-hero-top.png";
import deltaDiagramBottom from "./delta-hp-hero-bottom.png";

export const imageOffsets = {
  sm: 35,
  md: 48,
  lg: 63,
  xl: 66,
};

const DiagramSectionRoot = styled(Section)`
  background-color: white;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const DiagramWrapperTop = styled.div`
  max-width: 2000px;
  margin-left: auto;
  margin-right: auto;

  img {
    width: 100%;
    height: auto;

    ${(props) =>
      props.theme.mediaBreakpointMap(
        Object.entries(imageOffsets).reduce(
          (map, [size, offset]) => ({
            ...map,
            [size]: `margin-top: -${offset}px;`,
          }),
          {}
        )
      )}
  }
`;

const DiagramWrapperBottom = styled.div`
  max-width: 2000px;
  margin-left: auto;
  margin-right: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

const DiagramSection = () => (
  <DiagramSectionRoot>
    <DiagramWrapperTop>
      <a href="/integrations/">
        <img src={deltaDiagramTop} alt="Delta Lake Integrations" />
      </a>
    </DiagramWrapperTop>
    <DiagramWrapperBottom>
      <img src={deltaDiagramBottom} alt="An overview of Delta Lake" />
    </DiagramWrapperBottom>
  </DiagramSectionRoot>
);

export default DiagramSection;
