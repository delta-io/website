import Link from "src/components/Link";
import * as React from "react";
import Button from "src/components/Button";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";
import heroDesktop from "./hero-desktop.png";
import heroMobile from "./hero-mobile.png";

const HeroSectionRoot = styled(Section)`
  padding-bottom: ${(props) => props.theme.spacing.xl};
`;

const HeroSectionDescription = styled(Typography)`
  max-width: ${(props) => props.theme.rem(props.theme.breakpoints.md)};
  margin-left: auto;
  margin-right: auto;
`;

const ButtonRow = styled(Grid)`
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const VersionNumber = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${(props) => props.theme.spacing.xxl};
`;

const HeroImageMobile = styled(HeroImage)`
  max-width: 100%;
  max-width: 366px;

  ${(props) => props.theme.mediaBreakpointUp("md")("display: none;")}
`;

const HeroImageDesktop = styled(HeroImage)`
  display: none;
  max-width: 989px;

  ${(props) => props.theme.mediaBreakpointUp("md")("display: block;")}
`;

const HeroSection = () => (
  <HeroSectionRoot
    padding="xxxl"
    title="An Open Standard for Secure Data Sharing"
    background="white"
    primary
    subtitle={
      <>
        <HeroSectionDescription variant="p">
          Delta Sharing is the industry’s first open protocol for secure data
          sharing, making it simple to share data with other organizations
          regardless of which computing platforms they use.
        </HeroSectionDescription>
        <ButtonRow columns={["min-content", "min-content"]} gutter="lg">
          <Button
            href="https://github.com/delta-io/delta-sharing"
            target="_blank"
          >
            Get started
          </Button>
          <Button
            href="https://databricks.com/blog/2021/05/26/introducing-delta-sharing-an-open-protocol-for-secure-data-sharing.html"
            secondary
            target="_blank"
          >
            Read more
          </Button>
        </ButtonRow>
        <Typography variant="p2">
          <VersionNumber href="https://github.com/delta-io/delta-sharing">
            v0.1.0
          </VersionNumber>
        </Typography>
        <HeroImageMobile src={heroMobile} />
        <HeroImageDesktop src={heroDesktop} />
      </>
    }
    centeredHeader
  />
);

export default HeroSection;
