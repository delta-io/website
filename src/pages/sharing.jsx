import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import HeroSection from "src/components/pages/sharing/HeroSection";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import KeyFeaturesSection from "src/components/pages/shared/KeyFeaturesSection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";
import FeaturedVideoSection from "src/components/pages/sharing/FeaturedVideoSection";

const SharingPage = () => (
  <>
    <SEO title="Delta Sharing" />
    <PageLayout>
      <HeroSection />
      <FeaturedVideoSection />
      <KeyFeaturesSection
        features={[
          {
            title: "Share live data directly",
            description:
              "Easily share live data in your Delta Lake without copying it to another system.",
          },
          {
            title: "Support diverse clients",
            description:
              "Data recipients can directly connect to Delta Shares from Pandas, Apache Spark™, Rust, and other systems without having to first deploy a specific compute pattern. Reduce the friction to get your data to your users.",
          },
          {
            title: "Security and governance",
            description:
              "Delta Sharing allows you to easily govern, track, and audit access to your shared datasets.",
          },
          {
            title: "Scalability",
            description:
              "Share terabyte-scale datasets reliably and efficiently by leveraging cloud storage systems like S3, ADLS, and GCS.",
          },
        ]}
      />
      <CommunitySection />
      <ProjectGovernanceSection />
    </PageLayout>
  </>
);

export default SharingPage;
