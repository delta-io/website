import * as React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import deltaDiagram from "./delta-diagram.png";

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

const DiagramWrapper = styled.div`
  max-width: 970px;
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
    <DiagramWrapper>
      <img src={deltaDiagram} alt="An overview of Delta Lake" />
    </DiagramWrapper>
  </DiagramSectionRoot>
);

export default DiagramSection;
