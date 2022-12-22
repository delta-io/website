import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import LatestEventsSectionYoutube from "src/components/pages/community/LatestEventsSectionYoutube";
import ContributeSection from "src/components/pages/community/ContributeSection";
import ContributeToDeltaSection from "src/components/pages/community/ContributeToDeltaSection";
import CurrentCommittersSection from "src/components/pages/community/CurrentCommittersSection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";
import MaintainerProfileSection from "src/components/pages/community/MaintainerProfile";

const CommunityPage = () => (
  <PageLayout>
    <CommunitySection />
    <LatestEventsSectionYoutube />
    <ContributeSection />
    <MaintainerProfileSection />
    <CurrentCommittersSection />
    <ContributeToDeltaSection />
    <ProjectGovernanceSection />
  </PageLayout>
);

export const Head = () => <SEO title="Join the Delta Lake Community" />;

export default CommunityPage;
