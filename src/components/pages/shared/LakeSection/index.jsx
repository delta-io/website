import styled from "styled-components";
import Section from "src/components/Section";
import bgMobile from "./bg-mobile.jpg";
import bgDesktop from "./bg-desktop-with-crab.jpg";

const LakeSection = styled(Section)`
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

export default LakeSection;
