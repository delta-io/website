import * as React from "react";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import chartImg from "./chart2.png";

const TitleWrapper = styled(TypographyContainer)`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  margin-top: 1rem;
`;

const twitchSection = () => (
  <Section background={(theme) => theme.light.bg} padding="xl">
    <center>
      <TitleWrapper>
        Because of the contributions from our amazing community, Delta Lake is
        now up to 20M monthly downloads! We’re proud of the progress this
        project is making and invite you to get involved.{" "}
        <Link href="https://github.com/delta-io">Get started</Link> today.
      </TitleWrapper>
      <img src={chartImg} alt="Delta lake monthly downloads chart" />
    </center>
  </Section>
);

export default twitchSection;
