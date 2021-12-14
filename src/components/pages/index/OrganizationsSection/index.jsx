import * as React from "react";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import OrganizationTiles from "src/components/pages/shared/OrganizationTiles";

const OrganizationsSection = () => (
  <Section
    title="Organizations using and contributing to Delta Lake"
    subtitle={
      <Typography variant="p">
        Thousands of companies are processing exabytes of data per month with
        Delta Lake. See more <Link href="/community">here</Link>.
      </Typography>
    }
    centeredHeader
    padding="xxxl"
  >
    <OrganizationTiles columns={{ xs: 2, sm: 3, xl: 6 }} first={6} dark />
  </Section>
);

export default OrganizationsSection;
