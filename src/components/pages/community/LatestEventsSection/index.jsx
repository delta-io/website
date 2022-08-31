import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import thumbnail4 from "./community-office-hours_20220818.png";
import thumbnail3 from "./unified-source-interface.png";
import thumbnail2 from "./michael-armbrust-keynote.png";
import thumbnail1 from "./d3l2-ryan_harris.png";
import thumbnail0 from "./AUA-thumbnail.jpeg";

const updates = [
  {
    title: "D3L2: Cybersecurity, Data Mesh, and Delta Lake at HSBC",
    thumbnail: thumbnail1,
    url: "https://youtu.be/ctKctx7vGW4",
  },
  {
    title: "Delta Lake Community Office Hours (2022-08-18)",
    thumbnail: thumbnail4,
    url: "https://www.youtube.com/watch?v=lBr0UN7BEac&t=1s",
  },
  {
    title: "Apache Flink Source Connector for Delta Lake tables",
    thumbnail: thumbnail3,
    url: "/blog/2022-08-11-apache-flink-source-connector-for-delta-lake-tables/",
  },
  {
    title: "Delta 2.0 - The Foundation of your Data Lakehouse is Open",
    thumbnail: thumbnail2,
    url: "/blog/2022-08-02-delta-2-0-the-foundation-of-your-data-lake-is-open/",
  },
];

const featured = [
  {
    thumbnail: thumbnail0,
    url: "https://community.linuxfoundation.org/events/details/lfhq-delta-lake-presents-simon-denny-ask-us-anything-september-6-2022/",
  },
];

const CenteredImageStrip = styled(ImageStrip)`
  text-align: center;
`;

const FeaturedImageStrip = styled(ImageStrip)`
  align: center;
  text-align: center;
  max-width: 800px;
`;

const FeaturedSectionColumn = styled(TypographyContainer)`
  text-align: left;
  margin-bottom: 50px;

  img {
    width: 100%;
    height: auto;
    // max-width: 500px;
  }
`;

const LatestEventsSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="Check out the upcoming and most recent events"
    titleSize="h2"
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ md: 2 }} gutter="xxl">
      <FeaturedSectionColumn>
        <FeaturedImageStrip items={featured} />
      </FeaturedSectionColumn>
      <FeaturedSectionColumn>
        <Typography variant="h3">
          <Link
            href="https://community.linuxfoundation.org/events/details/lfhq-delta-lake-presents-d3l2-cybersecurity-data-mesh-and-delta-lake-at-hsbc/"
            muted
          >
            Simon and Denny Ask Us Anything - September 6, 2022
          </Link>
        </Typography>
        <Typography variant="p">
          Join us for the brand new monthly series "Simon and Denny - Ask Us
          Anything!" where we will answer your data engineering questions from
          building a data platform to ingestion to ETL to analytics. With our
          background in SQL Server and BI to Apache Spark and Delta Lake - we
          want to show you how to build your own lakehouse. As this session is
          interactive, come prepared to ask questions all throughout the
          session! Be prepared for another geeky, trans-Atlantic event from two
          data nerds.
        </Typography>
      </FeaturedSectionColumn>
    </Grid>

    <CenteredImageStrip items={updates} />
  </Section>
);

export default LatestEventsSection;
