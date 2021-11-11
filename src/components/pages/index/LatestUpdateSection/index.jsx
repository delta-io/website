import color from "color";
import Link from "src/components/Link";
import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";
import genericThumbnail from "./generic-thumbnail.png";
import beyondLambdaVideoThumbnail from "./beyond-lambda-introducing-delta-architecture.jpg";
import salesforceBlogThumbnail from "./salesforce-blog-thumbnail.jpg";
import gettingDataReadyVideoThumbnail from "./getting-data-ready-for-data-science-with-delta-lake-and-mlflow.jpg";

const updates = [
  {
    title: "Delta Lake 1.0.0 Released",
    thumbnail: genericThumbnail,
    url: "/blog/2021-05-24-delta-lake-1-0-0-released",
  },
  {
    title: "Beyond Lambda: Introducing Delta Architecture",
    thumbnail: beyondLambdaVideoThumbnail,
    url: "https://www.youtube.com/watch?v=FePv0lro0z8",
  },
  {
    title: "Salesforce Engineering: Delta Lake Tech Talk Series",
    thumbnail: salesforceBlogThumbnail,
    url: "/blog/2021-03-02-salesforce-engineering-delta-lake-tech-talk-series",
  },
  {
    title: "Getting Data Ready for Data Science with Delta Lake and MLflow",
    thumbnail: gettingDataReadyVideoThumbnail,
    url: "https://www.youtube.com/watch?v=hQaENo78za0",
  },
];

const CardThumbnail = styled.div`
  padding-top: ${(9 / 16) * 100}%;
  position: relative;
  background-color: ${(props) => color(props.theme.light.bg).darken(0.1)};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CardTitle = styled(Typography)`
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LatestUpdateSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="The Latest"
    titleSize="h5"
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gutter="xl">
      {updates.map((update) => (
        <div key={update.url}>
          <Link href={update.url}>
            <CardThumbnail>
              <img src={update.thumbnail} alt="" />
            </CardThumbnail>
          </Link>
          <CardTitle variant="p2">
            <Link href={update.url}>{update.title}</Link>
          </CardTitle>
        </div>
      ))}
    </Grid>
  </Section>
);

export default LatestUpdateSection;
