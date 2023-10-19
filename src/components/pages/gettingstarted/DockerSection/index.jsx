/* eslint-disable react/no-danger */
import * as React from "react";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import DockerTiles from "src/components/pages/gettingstarted/DockerTiles";

const DockerSection = () => (
  <Section
    title="Step 1: Setup and use Docker"
    subtitle={
      <Typography variant="p">
        The fastest way to get started with Delta Lake is to use <b>one</b> of
        our Docker options.
        <br />
        If you want to build Delta Lake, please choose the GitHub options.
      </Typography>
    }
    centeredHeader
    padding="xl"
  >
    <DockerTiles alignCenter dark />
  </Section>
);

export default DockerSection;
