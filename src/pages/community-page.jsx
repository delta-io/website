import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import LatestEventsSection from "src/components/pages/community/LatestEventsSection";
import ContributeSection from "src/components/pages/community/ContributeSection";
import ContributeToDeltaSection from "src/components/pages/community/ContributeToDeltaSection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";

const CommunityPage = () => (
  <>
    <SEO title="Join the Delta Lake Community" />
    <PageLayout>
      <CommunitySection />
      <LatestEventsSection />
      <ContributeSection />
      <ContributeToDeltaSection />
      <ProjectGovernanceSection />
    </PageLayout>
  </>
);

export default CommunityPage;
