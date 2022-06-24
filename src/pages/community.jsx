import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import HeroSection from "src/components/pages/sharing/HeroSection";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import ContributeSection from "src/components/pages/community/ContributeSection";
import ContributeToDeltaSection from "src/components/pages/community/ContributeToDeltaSection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";
import FeaturedVideoSection from "src/components/pages/sharing/FeaturedVideoSection";
import ConnectorsSection from "src/components/pages/sharing/ConnectorsSection";
import EcosystemSection from "src/components/pages/sharing/EcosystemSection";

const CommunityPage = () => (
  <>
    <SEO title="Join the Delta Lake Community" />
    <PageLayout>
      <CommunitySection />

      <HeroSection />
      <FeaturedVideoSection />

      <ConnectorsSection />
      <EcosystemSection />

      <ContributeSection />
      <ContributeToDeltaSection />
      <ProjectGovernanceSection />
    </PageLayout>
  </>
);

export default CommunityPage;
