import * as React from "react";
import styled from "styled-components";
import Button from "src/components/Button";
import ButtonRow from "src/components/ButtonRow";
import LakeSection from "src/components/pages/shared/LakeSection";
import Typography, { TypographyContainer } from "src/components/Typography";
import { string, node } from "prop-types";
import Link from "src/components/Link";
import { imageOffsets } from "./DiagramSection";

const HeroSectionContent = styled(TypographyContainer)`
  text-align: center;
`;

const HeroSectionDescription = styled(Typography)`
  max-width: ${(props) => props.theme.rem(props.theme.breakpoints.md)};
  margin-left: auto;
  margin-right: auto;
  font-size: 1.35rem;

  a {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const HeroButton = styled(Button)`
  min-width: 200px;
`;

const HeroLink = styled(Link)`
  &:hover {
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
  const { title, description, ctaLabel, ctaUrl } = props;

  return (
    <LakeSection padding="xxxl" primary>
      <HeroSectionContent>
        <Typography variant="h1">{title}</Typography>
        <HeroSectionDescription variant="p">
          {description}
        </HeroSectionDescription>
        <Typography variant="p">
          <HeroButton href={ctaUrl} variant="accent">
            {ctaLabel}
          </HeroButton>
        </Typography>
        <Typography variant="p">
          <ButtonRow columns={["60px", "65px", "65px"]} gutter="lg">
            <HeroLink
              href="https://github.com/delta-io/delta"
              style={{ textAlign: "left" }}
              newTab
              muted
            >
              Github
            </HeroLink>
            <HeroLink
              href="https://github.com/delta-io/delta/releases/tag/v2.0.0"
              newTab
              muted
            >
              Releases
            </HeroLink>
            <HeroLink
              href="https://go.delta.io/roadmap"
              style={{ textAlign: "right" }}
              newTab
              muted
            >
              Roadmap
            </HeroLink>
          </ButtonRow>
        </Typography>
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
};

export default HeroSection;
