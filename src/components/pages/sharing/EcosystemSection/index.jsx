import * as React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import ecosystemMobile from "./ecosystem-mobile.png";
import ecosystemDesktop from "./ecosystem-desktop.png";

const EcosystemImageBase = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

const MobileImage = styled(EcosystemImageBase)`
  max-width: 340px;

  ${(props) => props.theme.mediaBreakpointUp("md")(`display: none;`)}
`;

const DesktopImage = styled(EcosystemImageBase)`
  max-width: 1140px;
  display: none;

  ${(props) => props.theme.mediaBreakpointUp("md")(`display: block;`)}
`;

const EcosystemSection = () => (
  <Section
    title="Delta Sharing Ecosystem"
    padding="xxxl"
    centeredHeader
    background="white"
  >
    <MobileImage src={ecosystemMobile} alt="" />
    <DesktopImage src={ecosystemDesktop} alt="" />
  </Section>
);

export default EcosystemSection;
