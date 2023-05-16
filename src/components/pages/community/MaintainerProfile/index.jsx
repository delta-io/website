import * as React from "react";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import profileImg from "./Tyler-Croy-min.jpg";

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

const currentContributor = {
  name: "R. Tyler Croy",
  avatar: profileImg,
  profile: "/profiles/tyler-croy",
  occupation: "Lead the Platform Engineering organization at Scribd",
  quote:
    "From my perspective, it’s only the beginning with delta-rs. Delta Lake is a deceptively simple technology" +
    " with tremendous potential across the data platform.",
};

const profileMaintainer = () => (
  <Section background="white" centerHeader padding="xl">
    <br />
    <h1>
      <center>Featured Contributor</center>
    </h1>

    <Link href={currentContributor.profile} muted>
      <Section background="white" padding="xl">
        <center>
          <Grid columns={{ xs: 1, sm: 1, md: 4 }} gutter="xl">
            <ColumnWrapper>
              <img
                src={currentContributor.avatar}
                alt={currentContributor.name}
              />
            </ColumnWrapper>
            <ColumnWrapper style={{ gridColumn: "span 3" }}>
              <NameWrapper>{currentContributor.name}</NameWrapper>
              <TitleWrapper>{currentContributor.occupation}</TitleWrapper>
              <Typography variant="p">
                <br />
                <QuoteWrapper>
                  <em>&#34;{currentContributor.quote}&#34;</em>
                  <br />
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
