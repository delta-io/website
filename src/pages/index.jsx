import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import AnnouncementSection from "src/components/pages/index/AnnouncementSection";
import HeroSection from "src/components/pages/index/HeroSection";
import Link from "src/components/Link";
import DiagramSection from "src/components/pages/index/DiagramSection";
import LatestUpdateSection from "src/components/pages/index/LatestUpdateSection";
// import KeyFeaturesSection from "src/components/pages/shared/KeyFeaturesSection";
import ValuePropsSection from "src/components/pages/index/ValuePropsSection";
import KeyFeaturesSection from "src/components/pages/index/KeyFeaturesSection";
// import GetStartedSection from "src/components/pages/index/GetStartedSection";
// import OrganizationsSection from "src/components/pages/index/OrganizationsSection";
import ContributeToDeltaSection from "src/components/pages/community/ContributeToDeltaSection";
import WhitepaperSection from "src/components/pages/index/WhitepaperSection";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";
import ChatService from "src/services/chatService";

const HomePage = () => {
  React.useEffect(() => {
    ChatService.createChat();
  }, []);

  return (
    <PageLayout>
      <AnnouncementSection
        title="Announcing Delta Lake 2.2.0 on Apache Spark™ 3.3"
        description="Try out the latest release today!"
        url="http://go.delta.io/latest"
      />
      <HeroSection
        title="Build Lakehouses with Delta Lake"
        description={
          <>
            {" "}
            <Link
              href="https://databricks.com/wp-content/uploads/2020/08/p975-armbrust.pdf"
              newTab
            >
              Delta Lake
            </Link>{" "}
            is an open-source storage framework that enables building a <br />{" "}
            <Link
              href="http://cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf"
              newTab
            >
              Lakehouse architecture
            </Link>{" "}
            with compute engines including Spark, PrestoDB, Flink, Trino, and
            Hive and APIs for Scala, Java, Rust, Ruby, and Python.
          </>
        }
        ctaLabel="Get Started"
        ctaUrl="/learn/getting-started"
        versionNumber="1.1.0"
        logo
      />
      <DiagramSection />
      <ValuePropsSection />
      <LatestUpdateSection />
      <KeyFeaturesSection />
      <WhitepaperSection />
      {/* <OrganizationsSection /> */}
      <ContributeToDeltaSection />
      <CommunitySection />
      <AnnouncementSection
        title="Check out Last Week in a Byte newsletter"
        description="for the latest Delta events...a week late!"
        url="http://go.delta.io/lastweek"
      />
      <ProjectGovernanceSection />
    </PageLayout>
  );
};

export const Head = () => <SEO title="Home" />;

export default HomePage;
