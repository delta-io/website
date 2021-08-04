import * as React from "react";
import styled from "styled-components";
import Button from "src/components/Button";
import LakeSection from "src/components/pages/shared/LakeSection";
import Typography, { TypographyContainer } from "src/components/Typography";
import { string, node } from "prop-types";
import { imageOffsets } from "./DiagramSection";

const HeroSectionContent = styled(TypographyContainer)`
  text-align: center;
`;

const HeroSectionDescription = styled(Typography)`
  max-width: ${(props) => props.theme.rem(props.theme.breakpoints.md)};
  margin-left: auto;
  margin-right: auto;

  a {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const HeroSectionDiagramOffset = styled.div`
  ${(props) =>
    props.theme.mediaBreakpointMap(
      Object.entries(imageOffsets).reduce(
        (map, [size, offset]) => ({
          ...map,
          [size]: `height: ${offset}px;`,
        }),
        {}
      )
    )}
`;

const HeroSection = (props) => {
  const { title, description, ctaLabel, ctaUrl, versionNumber } = props;

  return (
    <LakeSection padding="xxl">
      <HeroSectionContent>
        <Typography variant="h1">{title}</Typography>
        <HeroSectionDescription variant="p">
          {description}
        </HeroSectionDescription>
        <Typography variant="p">
          <Button to={ctaUrl}>{ctaLabel}</Button>
        </Typography>
        <Typography variant="p2">v{versionNumber}</Typography>
      </HeroSectionContent>
      <HeroSectionDiagramOffset />
    </LakeSection>
  );
};

HeroSection.propTypes = {
  title: string.isRequired,
  description: node.isRequired,
  ctaLabel: string.isRequired,
  ctaUrl: string.isRequired,
  versionNumber: string.isRequired,
};

export default HeroSection;
