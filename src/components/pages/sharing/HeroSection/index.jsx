import Link from "src/components/Link";
import * as React from "react";
import Button from "src/components/Button";
import ButtonRow from "src/components/ButtonRow";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";
import sharingLogo from "./delta-sharing-logo.svg";
import heroDesktop from "./hero-desktop.png";
import heroMobile from "./hero-mobile.png";

const DeltaSharingLogo = styled.img`
  width: 200px;

  ${(props) =>
    props.theme.mediaBreakpointUp("md")(`
    width: 300px;
  `)}

  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
    width: auto;
  `)}
`;

const HeroSectionRoot = styled(Section)`
  padding-bottom: ${(props) => props.theme.spacing.xl};
`;

const HeroSectionDescription = styled(Typography)`
  max-width: ${(props) => props.theme.rem(props.theme.breakpoints.md)};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${(props) => `-${props.theme.spacing.xs}`};
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
    title={<DeltaSharingLogo src={sharingLogo} alt="Delta Sharing" />}
    background="white"
    primary
    subtitle={
      <>
        <HeroSectionDescription variant="h3">
          An open standard for secure data sharing
        </HeroSectionDescription>
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
          <ButtonRow columns={["60px", "60px"]} gutter="lg">
            <Link
              href="https://github.com/delta-io/delta-sharing"
              target="_blank"
              style={{ textAlign: "right" }}
              muted
            >
              Github
            </Link>{" "}
            <Link
              href="https://github.com/delta-io/delta-sharing/releases"
              target="_blank"
              muted
            >
              Releases
            </Link>
          </ButtonRow>
        </Typography>
        <HeroImageMobile src={heroMobile} />
        <HeroImageDesktop src={heroDesktop} />
      </>
    }
    centeredHeader
  />
);

export default HeroSection;
