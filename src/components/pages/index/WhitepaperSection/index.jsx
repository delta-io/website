import * as React from "react";
import Button from "src/components/Button";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import separateStorage from "./separate-storage.png";
import streamTableStorage from "./stream-table-storage.jpg";

const WhitepaperSectionColumn = styled(TypographyContainer)`
  text-align: center;

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

  span {
    display: block;
    padding-bottom: 0.625rem;
    margin: 0;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
  }

  &:hover span,
  &:focus span {
    color: ${(props) => props.theme.colors.link};
  }
`;

const WhitepaperSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="Read the Lakehouse Storage Systems Whitepaper"
    subtitle={
      <>
        <Typography variant="p">
          This whitepaper dives into the features of Lakehouse storage systems
          and compares Delta Lake, Apache Hudi, and Apache Iceberg. It explains
          the benefits of Lakehouse storage systems and shows key performance
          benchmarks.
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
          <Typography as="span">
            Pipeline using separate storage systems
          </Typography>
          <img src={separateStorage} alt="" />
        </DocumentLink>
      </WhitepaperSectionColumn>
      <WhitepaperSectionColumn>
        <DocumentLink href="https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf">
          <Typography as="span">
            Using Delta Lake for both stream and table storage
          </Typography>
          <img src={streamTableStorage} alt="" />
        </DocumentLink>
      </WhitepaperSectionColumn>
    </Grid>
  </Section>
);

export default WhitepaperSection;
