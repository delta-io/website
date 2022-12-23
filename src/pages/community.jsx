import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import AnnouncementSection from "src/components/pages/index/AnnouncementSection";
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
    <AnnouncementSection
      title="Check out Last Week in a Byte newsletter"
      description="for the latest Delta events...a week late!"
      url="http://go.delta.io/lastweek"
    />
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
