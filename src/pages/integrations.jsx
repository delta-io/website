import * as React from "react";
import PageLayout from "src/components/PageLayout";
import Section from "src/components/Section";
import styled from "styled-components";
import Typography from "src/components/Typography";
import JsonCardDataList from "src/components/pages/shared/JsonCardDataList";
import UniForm from "src/components/UniForm";

const Wrapper = styled.div`
  padding: 2.5rem 0;
`;

const IntegrationsPage = () => (
  <PageLayout>
    <Section
      title="Delta Lake Integrations"
      subtitle={
        <Typography variant="p">
          Use the following frameworks, Delta Sharing clients, managed services,
          and/or community integrations <br /> for Delta Lake and Delta Sharing.
        </Typography>
      }
      centeredHeader
      padding="xl"
      logo
    />
    <UniForm />
    <Section
      title="Frameworks"
      subtitle={
        <Typography variant="p">
          Use the following frameworks and languages including but not limited
          to Apache Flink, Apache Spark, Trino, and Rust.
        </Typography>
      }
      background="white"
      centeredHeader
      padding="xl"
    >
      <Wrapper>
        <JsonCardDataList data="connectors" />
      </Wrapper>
    </Section>

    <Section
      title="Sharing"
      subtitle={
        <Typography variant="p">
          Use the following clients that integrate with Delta Sharing from C++
          to Rust.
        </Typography>
      }
      centeredHeader
      padding="xl"
      backkground="grey"
    >
      <Wrapper>
        <JsonCardDataList data="sharing" />
      </Wrapper>
    </Section>
    <Section
      title="Services"
      subtitle={
        <Typography variant="p">
          Use the managed services of your choice that integrate with Delta
          Lake.
        </Typography>
      }
      background="white"
      centeredHeader
      padding="xl"
    >
      <Wrapper>
        <JsonCardDataList data="services" />
      </Wrapper>
    </Section>

    <Section
      title="Community"
      subtitle={
        <Typography variant="p">
          Try out the following community integrations with Delta Lake.
        </Typography>
      }
      centeredHeader
      padding="xl"
      backkground="grey"
    >
      <Wrapper>
        <JsonCardDataList data="community" />
      </Wrapper>
    </Section>
  </PageLayout>
);

export default IntegrationsPage;
