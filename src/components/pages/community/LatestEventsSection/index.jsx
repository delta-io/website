import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import thumbnail4 from "./delta-birthday.png";
import thumbnail3 from "./ukraine-meetup.png";
import thumbnail2 from "./module-3.jpeg";
import thumbnail1 from "./community-ama-20220609.jpeg";

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
];

const CenteredImageStrip = styled(ImageStrip)`
  text-align: center;
`;

const FeaturedImageStrip = styled(ImageStrip)`
  align: center;
  text-align: center;
`;

const LatestEventsSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="Check out the latest events"
    titleSize="h2"
    centeredHeader
    padding="xxxl"
  >
    <FeaturedImageStrip items={featured} />
    <CenteredImageStrip items={updates} />
  </Section>
);

export default LatestEventsSection;
