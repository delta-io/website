import * as React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import { Link } from "gatsby";
import Typography, { TypographyContainer } from "src/components/Typography";
import Embed from "src/components/Embed";
import sharingVideo from "./sharing-video.jpg";

const FeaturedVideoContent = styled(TypographyContainer)`
  text-align: center;
`;

const VideoThumbnail = styled(Embed)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const FeaturedVideoSection = () => (
  <Section
    title="Watch the Data+AI Summit 2021 Sharing Announcement"
    padding="xxl"
    centeredHeader
  >
    <FeaturedVideoContent>
      <Link to="https://youtu.be/HQRusxdkwFo">
        <VideoThumbnail
          src={sharingVideo}
          aspectRatio={[16, 9]}
          maxWidth="402px"
        />
      </Link>
      <Typography variant="p">
        Open Data Sharing Keynote by Matei Zaharia, original creator of Apache
        Spark™ and MLFLow.
      </Typography>
    </FeaturedVideoContent>
  </Section>
);

export default FeaturedVideoSection;
