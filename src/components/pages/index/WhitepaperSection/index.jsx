import * as React from "react";
import Button from "src/components/Button";
import Grid from "src/components/Grid";
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
    max-width: 500px;
  }
`;

const WhitepaperSection = () => (
  <Section
    title="Read the Lakehouse Whitepaper"
    subtitle={
      <>
        <Typography variant="p">
          Together, the features of Delta Lake improve both the manageability
          and performance of working with data in cloud storage objects, and
          enable a “lakehouse” paradigm that combines the key features of data
          warehouses and data lakes: standard DBMS management functions usable
          against low-cost object stores.
        </Typography>
        <Typography variant="p">
          <Button href="http://cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf">
            Read the whitepaper
          </Button>
        </Typography>
      </>
    }
    background="white"
    centeredHeader
    padding="xxl"
  >
    <Grid columns={{ md: 2 }} gutter="xxl">
      <WhitepaperSectionColumn>
        <Typography variant="h5">
          Pipeline using separate storage systems
        </Typography>
        <img src={separateStorage} alt="" />
      </WhitepaperSectionColumn>
      <WhitepaperSectionColumn>
        <Typography variant="h5">
          Using Delta Lake for both stream and table storage
        </Typography>
        <img src={streamTableStorage} alt="" />
      </WhitepaperSectionColumn>
    </Grid>
  </Section>
);

export default WhitepaperSection;
