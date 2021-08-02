import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import Section from "src/components/Section";

const HomePage = () => (
  <>
    <SEO title="Home" />
    <PageLayout>
      <Section padding="xl">Home page</Section>
    </PageLayout>
  </>
);

export default HomePage;
