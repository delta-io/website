import * as React from "react";
import styled from "styled-components";
import Button from "src/components/Button";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import { string, node } from "prop-types";
import bgMobile from "./bg-mobile.jpg";
import bgDesktop from "./bg-desktop.jpg";
import { imageOffsets } from "../DiagramSection";

const HeroSectionRoot = styled(Section)`
  background-color: ${(props) => props.theme.dark.bg};
  color: ${(props) => props.theme.dark.color};
  background-image: url(${bgMobile});
  background-size: cover;
  background-position: 50%;

  ${(props) =>
    props.theme.mediaBreakpointUp("sm")(`
    background-image: url(${bgDesktop});
  `)}
`;

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
    <HeroSectionRoot padding="xxl">
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
    </HeroSectionRoot>
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
