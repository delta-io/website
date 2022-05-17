import * as React from "react";
import ImageStrip from "src/components/ImageStrip";
import Section from "src/components/Section";
import styled from "styled-components";
import thumbnail4 from "./S3-multi-cluster-writes-diagram.png";
import thumbnail3 from "./delta-1-2-features.png";
import thumbnail2 from "./ama_2022-04-28.jpg";
import thumbnail1 from "./apache-flink-app-with-delta-lake.png";

const updates = [
  {
    title: "Multi-cluster writes to Delta Lake Storage in S3",
    thumbnail: thumbnail4,
    url: "http://delta.io/blog/2022-05-18-multi-cluster-writes-to-delta-lake-storage-in-s3/",
  },
  {
    title:
      "Delta Lake 1.2 - More Speed, Efficiency and Extensibility Than Ever",
    thumbnail: thumbnail3,
    url: "http://delta.io/blog/2022-05-05-delta-lake-1-2-released/",
  },
  {
    title: "Community AMA (2022-04-28)",
    thumbnail: thumbnail2,
    url: "https://www.youtube.com/watch?v=oc1mlhtsyPg",
  },
  {
    title: "Writing to Delta Lake from Apache Flink",
    thumbnail: thumbnail1,
    url: "http://delta.io/blog/2022-04-27-writing-to-delta-lake-from-apache-flink/",
  },
];

const CenteredImageStrip = styled(ImageStrip)`
  text-align: center;
`;

const LatestUpdateSection = () => (
  <Section
    background={(theme) => theme.light.bg}
    title="The Latest"
    titleSize="h5"
    centeredHeader
    padding="xxxl"
  >
    <CenteredImageStrip items={updates} />
  </Section>
);

export default LatestUpdateSection;
