import * as React from "react";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import profileImg from "src/images/tyler-croy/Tyler-Croy-min.jpg";
import twitchImg from "./twitch-logo-4931D91F85-seeklogo.com.png";

const ColumnWrapper = styled(TypographyContainer)`
  text-align: left;
  vertical-align: top;
  margin: 0;
  padding: 0;
  img {
    align: right;
    text-align: right;
    width: 120px;
    height: auto;
  }
`;

const NameWrapper = styled(TypographyContainer)`
  font-size: 2rem;
`;

const TitleWrapper = styled(TypographyContainer)`
  font-size: 1.5rem;
`;

const twitchSection = () => (
  <Section background="white" padding="xl">
    <center>
      <Grid columns={{ xs: 1, sm: 1, md: 6 }} gutter="xl">
        <ColumnWrapper>
          <Link href="https://www.twitch.tv/agentdero">
            <img src={profileImg} alt="R. Tyler Croy" />
          </Link>
        </ColumnWrapper>
        <ColumnWrapper style={{ gridColumn: "span 4" }}>
          <NameWrapper>
            Watch Delta Rust code development LIVE on Twitch.tv!
          </NameWrapper>
          <TitleWrapper>
            with{" "}
            <Link href="https://www.twitch.tv/agentdero">
              R. Tyler Croy (agentdero)
            </Link>
            , Delta Lake maintainer,
            <br /> Director of Platform Engineering, Scribd
          </TitleWrapper>
        </ColumnWrapper>
        <Link href="https://www.twitch.tv/agentdero">
          <img src={twitchImg} alt="Twitch Logo" />
        </Link>
      </Grid>
    </center>
  </Section>
);

export default twitchSection;
