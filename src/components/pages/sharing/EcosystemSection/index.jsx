import * as React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const ImageWrapper = styled.div`
  width: 100%;
`;

const EcosystemSection = () => (
  <Section
    title="Delta Sharing Ecosystem"
    padding="xxxl"
    centeredHeader
    background="white"
  >
    <ImageWrapper>
      <StaticImage src="./ecosystem-desktop.png" alt="ecosystem" />
    </ImageWrapper>
  </Section>
);

export default EcosystemSection;
