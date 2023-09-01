/* eslint-disable react/no-danger */
import * as React from "react";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import ApiTiles from "src/components/pages/gettingstarted/ApiTiles";

const ApiSection = () => (
  <Section
    title="Step 2: Try one or all of the APIs"
    subtitle={
      <Typography variant="p">
        Now that you are up and running with Docker, try out your favorite Delta
        Lake API.
        <br />
      </Typography>
    }
    background="white"
    centeredHeader
    padding="xl"
  >
    <ApiTiles alignCenter dark />

    <Typography variant="p">
      <br />
      <br />
      <center>
        Click on the box for a Delta Lake quick start with the API of your
        choice.
      </center>
      <br />
    </Typography>
  </Section>
);

export default ApiSection;
