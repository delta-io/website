import * as React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import deltaDiagram from "./delta-uniform-hero-v4.png";

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
  max-width: 1000px;
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

const DiagramSection = () => (
  <DiagramSectionRoot>
    <DiagramWrapperTop>
      <a href="/integrations/">
        <img src={deltaDiagram} alt="Delta Lake Integrations" />
      </a>
    </DiagramWrapperTop>
  </DiagramSectionRoot>
);

export default DiagramSection;
