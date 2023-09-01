import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import AnnouncementSection from "src/components/pages/index/AnnouncementSection";
import HeaderSection from "src/components/pages/gettingstarted/HeaderSection";
import ApiSection from "src/components/pages/gettingstarted/ApiSection";
import VideoSection from "src/components/pages/gettingstarted/VideoSection";
import DockerSection from "src/components/pages/gettingstarted/DockerSection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";

const CommunityPage = () => (
  <PageLayout>
    <HeaderSection />
    <DockerSection />
    <ApiSection />
    <AnnouncementSection
      title="Check out Last Week in a Byte newsletter"
      description="for the latest Delta events...a week late!"
      url="http://go.delta.io/lastweek"
    />
    <VideoSection />
    <ProjectGovernanceSection />
  </PageLayout>
);

export const Head = () => <SEO title="Getting Started with Delta Lake" />;

export default CommunityPage;
