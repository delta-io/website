import * as React from "react";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import profileImg from "./florian-valeye.jpeg";

const QuoteWrapper = styled.div`
  padding: xxxl;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  background-color: hsl(191, 100%, 97.7%);
`;

const ColumnWrapper = styled(TypographyContainer)`
  text-align: left;
  vertical-align: top;
  margin: 0;
  padding: 0;
  img {
    align: right;
    text-align: right;
    width: 250px;
    height: auto;
  }
`;

const NameWrapper = styled(TypographyContainer)`
  font-size: 2.5rem;
`;

const TitleWrapper = styled(TypographyContainer)`
  font-size: 1.5rem;
`;

const profileMaintainer = () => (
  <Section background="white" centerHeader padding="xl">
    <br />
    <h1>
      <center>Contributor of the Month</center>
    </h1>

    <Link href="/profiles/florian-valeye" muted>
      <Section background="white" padding="xl">
        <center>
          <Grid columns={{ xs: 1, sm: 1, md: 4 }} gutter="xl">
            <ColumnWrapper>
              <img src={profileImg} alt="Florian Valeye" />
            </ColumnWrapper>
            <ColumnWrapper style={{ gridColumn: "span 3" }}>
              <NameWrapper>Florian Valeye</NameWrapper>
              <TitleWrapper>
                Delta Lake Maintainer, Staff Data Engineer at Back Market
              </TitleWrapper>
              <Typography variant="p">
                <br />
                <QuoteWrapper>
                  <em>
                    &#34;Contributing to open source is key to learning how to
                    solve problems within worldwide, benevolent communities of
                    people.&#34;
                  </em>
                  <br />
                  <br />
                  Source: &nbsp;
                  <Link href="https://project.linuxfoundation.org/hubfs/LF%20Research/2022%20Linux%20Foundation%20Annual%20Report.pdf?hsLang=en">
                    Linux Foundation 2022 Annual Report
                  </Link>
                </QuoteWrapper>
              </Typography>
            </ColumnWrapper>
          </Grid>
        </center>
      </Section>
    </Link>
  </Section>
);

export default profileMaintainer;
