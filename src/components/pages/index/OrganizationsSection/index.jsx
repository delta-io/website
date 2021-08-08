import * as React from "react";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Grid from "src/components/Grid";
import styled from "styled-components";
import Typography from "src/components/Typography";
import tencent from "./logos/tencent.png";
import databricks from "./logos/databricks.png";
import comcast from "./logos/comcast.png";
import alibaba from "./logos/alibaba.png";
import viacom from "./logos/viacom.png";
import condeNast from "./logos/conde-nast.png";

const logos = [
  {
    src: tencent,
    alt: "Tencent",
  },
  {
    src: databricks,
    alt: "Databricks",
  },
  {
    src: comcast,
    alt: "Comcast",
  },
  {
    src: alibaba,
    alt: "Alibaba",
  },
  {
    src: viacom,
    alt: "Viacom",
  },
  {
    src: condeNast,
    alt: "Condé Nast",
  },
];

const OrganizationLogo = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: auto;
  }
`;

const OrganizationsSection = () => (
  <Section
    title="Organizations using and contributing to Delta Lake"
    subtitle={
      <Typography variant="p">
        Thousands of companies are processing exabytes of data per month with
        Delta Lake. See more <Link href="/community">here</Link>.
      </Typography>
    }
    centeredHeader
    padding="xxl"
  >
    <Grid columns={{ xs: 2, sm: 3, xl: 6 }} gutter="lg" evenRows>
      {logos.map((logo) => (
        <OrganizationLogo key={logo.alt}>
          <img src={logo.src} alt={logo.alt} />
        </OrganizationLogo>
      ))}
    </Grid>
  </Section>
);

export default OrganizationsSection;
