import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import thumbnail4 from "./community-office-hours_2022-09-08.jpeg";
import thumbnail3 from "./michael-armbrust-keynote.png";
import thumbnail2 from "./AUA-thumbnail.jpeg";
import thumbnail1 from "./d3l2-ryan_harris.png";
import thumbnail0 from "./D3L2-TMobile-DSNA.png";

const updates = [
  {
    title: "Simon and Denny Ask Us Anything - September 6, 2022",
    thumbnail: thumbnail2,
    url: "https://community.linuxfoundation.org/events/details/lfhq-delta-lake-presents-simon-denny-ask-us-anything-september-6-2022/",
  },
  {
    title: "Delta Lake Community Office Hours (2022-09-08)",
    thumbnail: thumbnail4,
    url: "https://youtu.be/LaKcKagdwHY",
  },
  {
    title: "D3L2: Cybersecurity, Data Mesh, and Delta Lake at HSBC",
    thumbnail: thumbnail1,
    url: "https://youtu.be/ctKctx7vGW4",
  },
  {
    title: "Data + AI Summit 2022 | Michael Armbrust's Delta Lake Keynote",
    thumbnail: thumbnail3,
    url: "https://youtu.be/O0Fr5X4i9os",
  },
];

const featured = [
  {
    thumbnail: thumbnail0,
    url: "https://community.linuxfoundation.org/events/details/lfhq-delta-lake-presents-d3l2-why-did-we-migrate-to-a-data-lakehouse-on-delta-lake-for-t-mobile-data-science-and-analytics-team/",
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
            href="https://community.linuxfoundation.org/events/details/lfhq-delta-lake-presents-d3l2-why-did-we-migrate-to-a-data-lakehouse-on-delta-lake-for-t-mobile-data-science-and-analytics-team/"
            muted
          >
            D3L2: Why did we migrate to a Data Lakehouse on Delta Lake for
            T-Mobile Data Science and Analytics Team
          </Link>
        </Typography>
        <Typography variant="p">
          T-Mobile&#39;s mission to build the nation&#39;s best 5G network
          drastically increased the number of monthly network projects planned
          and directly impacted the enterprise procurement and supply chain
          organizations. Like many enterprises, data at T-Mobile was spread
          between disparate, unintegrated and complex systems.
          <br />
          In this session, we will discuss the how and why we migrated from
          databases and data lakes to a data lakehouse on Delta Lake. Our
          lakehouse architecture allows reading and writing of data without
          blocking and scales out linearly. Business partners can easily adopt
          advanced analytics and derive new insights. These new insights promote
          innovation across disparate workstreams and solidify the decentralized
          approach to analytics taken by T-Mobile.
        </Typography>
      </FeaturedSectionColumn>
    </Grid>

    <CenteredImageStrip items={updates} />
  </Section>
);

export default LatestEventsSection;
