import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import thumbnail4 from "./delta-birthday.png";
import thumbnail3 from "./ukraine-meetup.png";
import thumbnail2 from "./module-3.jpeg";
import thumbnail1 from "./community-ama-20220609.jpeg";
import thumbnail0 from "./db-212-blog-img-og.png";

const updates = [
  {
    title:
      "Delta Lake Contributors and Committers Meet and Greet .. and Birthday Party!",
    thumbnail: thumbnail4,
    url: "https://www.meetup.com/spark-users/events/286738371/",
  },
  {
    title: "MLflow AMA and Documenting War Crimes in Ukraine Event",
    thumbnail: thumbnail3,
    url: "https://www.meetup.com/spark-users/events/286738345/",
  },
  {
    title: "Module 3: Delta Lake 1.2 Tutorial with Jacek Laskowski",
    thumbnail: thumbnail2,
    url: "https://youtu.be/u3IrYoH6Aqs",
  },
  {
    title: "Delta Lake Community Office Hours (2022-06-09)",
    thumbnail: thumbnail1,
    url: "https://youtu.be/ZytlhuVGxso",
  },
];

const featured = [
  {
    // title: "Guide to Delta Lake Sessions at Data + AI Summit 2022",
    thumbnail: thumbnail0,
    url: "https://databricks.com/blog/2022/06/22/guide-to-delta-lake-sessions-at-data-ai-summit-2022.html",
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
    title="Check out the latest events"
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
            href="https://databricks.com/blog/2022/06/22/guide-to-delta-lake-sessions-at-data-ai-summit-2022.html"
            muted
          >
            Guide to Delta Lake Sessions at Data + AI Summit 2022
          </Link>
        </Typography>
        <Typography variant="p">
          Looking to learn more about Delta Lake? Want to see what’s the latest
          development in the project? Want to engage with other community
          members? If so, we invite you to attend this year’s{" "}
          <Link href="https://databricks.com/dataaisummit/north-america-2021">
            Data + AI Summit
          </Link>
          ! This global event brings together thousands of practitioners,
          industry leaders, and visionaries to engage in thought-provoking
          dialogue and share the latest innovations in data and AI.
        </Typography>
      </FeaturedSectionColumn>
    </Grid>

    <CenteredImageStrip items={updates} />
  </Section>
);

export default LatestEventsSection;
