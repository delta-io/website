import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import LatestEventsSection from "src/components/pages/community/LatestEventsSection";
import ContributeSection from "src/components/pages/community/ContributeSection";
import ContributeToDeltaSection from "src/components/pages/community/ContributeToDeltaSection";
import CurrentCommittersSection from "src/components/pages/community/CurrentCommittersSection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";

const CommunityPage = () => (
  <PageLayout>
    <CommunitySection />
    <LatestEventsSection />
    <ContributeSection />
    <CurrentCommittersSection />
    <ContributeToDeltaSection />
    <ProjectGovernanceSection />
  </PageLayout>
);

export const Head = () => <SEO title="Join the Delta Lake Community" />;

export default CommunityPage;
