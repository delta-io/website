import * as React from "react";
import Button from "src/components/Button";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import separateStorage from "./separate-storage.jpg";
import streamTableStorage from "./stream-table-storage.jpg";

const WhitepaperSectionColumn = styled(TypographyContainer)`
  text-align: center;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const ButtonRow = styled(Typography)`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const DocumentLink = styled(Link)`
  text-decoration: none;
  transition: 0.4s;

  color: ${(props) => props.theme.colors.text};

  span {
    display: block;
    padding-bottom: 0.625rem;
    margin: 0;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
  }

  &:hover,
  &:hover span,
  &:focus span {
    color: ${(props) => props.theme.colors.link};
  }
`;

const DocumentTitle = styled.span`
  display: inline-block;
  min-height: 64px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const WhitepaperSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="Read the Lakehouse Storage Systems Whitepapers"
    subtitle={
      <>
        <Typography variant="p">
          These whitepapers dive into the features of Lakehouse storage systems
          and compare Delta Lake, Apache Hudi, and Apache Iceberg. They also
          explain the benefits of Lakehouse storage systems and show key
          performance benchmarks.
        </Typography>
        <ButtonRow variant="p">
          <Button href="http://cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf">
            Read the whitepaper
          </Button>
        </ButtonRow>
      </>
    }
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ md: 2 }} gutter="xxl">
      <WhitepaperSectionColumn>
        <DocumentLink href="https://www.cidrdb.org/cidr2023/papers/p92-jain.pdf">
          <DocumentTitle>
            Analyzing and Comparing Lakehouse Storage Systems
          </DocumentTitle>
          <img src={separateStorage} alt="" />
        </DocumentLink>
      </WhitepaperSectionColumn>
      <WhitepaperSectionColumn>
        <DocumentLink href="https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf">
          <DocumentTitle>
            Lakehouse: A New Generation of Open Platforms that Unify Data
            Warehousing and Advanced Analytics
          </DocumentTitle>
          <img src={streamTableStorage} alt="" />
        </DocumentLink>
      </WhitepaperSectionColumn>
    </Grid>
    <LinkWrapper>
      <ButtonRow variant="p">
        <Button href="https://dl.acm.org/doi/10.14778/3415478.3415560">
          Delta Lake: high-performance ACID table storage over cloud object
          stores
        </Button>
      </ButtonRow>
    </LinkWrapper>
  </Section>
);

export default WhitepaperSection;
