import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import AnnouncementSection from "src/components/pages/index/AnnouncementSection";
import HeroSection from "src/components/pages/index/HeroSection";
import Link from "src/components/Link";
import DiagramSection from "src/components/pages/index/DiagramSection";
import LatestUpdateSection from "src/components/pages/index/LatestUpdateSection";
// import KeyFeaturesSection from "src/components/pages/shared/KeyFeaturesSection";
import KeyFeaturesSection from "src/components/pages/index/KeyFeaturesSection";
// import GetStartedSection from "src/components/pages/index/GetStartedSection";
import OrganizationsSection from "src/components/pages/index/OrganizationsSection";
import WhitepaperSection from "src/components/pages/index/WhitepaperSection";
import CommunitySection from "src/components/pages/shared/CommunitySection";
import ProjectGovernanceSection from "src/components/pages/shared/ProjectGovernanceSection";

const HomePage = () => (
  <>
    <SEO title="Home" />
    <PageLayout>
      <AnnouncementSection
        title="Announcing Delta Sharing"
        description="An Open Standard for Secure Data Sharing"
        url="/sharing"
      />
      <HeroSection
        title="Build Lakehouses with Delta Lake"
        description={
          <>
            Delta Lake is an open-source storage framework that enables building
            a <br />{" "}
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
      />
      <DiagramSection />
      <LatestUpdateSection />
      <KeyFeaturesSection />
      <OrganizationsSection />
      <WhitepaperSection />
      <CommunitySection />
      <ProjectGovernanceSection />
    </PageLayout>
  </>
);

export default HomePage;
