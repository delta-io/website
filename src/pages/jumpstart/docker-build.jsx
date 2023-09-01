import * as React from "react";
import PageLayout from "src/components/PageLayout";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import CodeBlock from "src/components/CodeBlock";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import deltaDockerImg from "src/images/jumpstart/delta-docker-tags.png";

const QuoteWrapper = styled.div`
  padding: 20px;
  width: 800px;
  background-color: hsl(191, 100%, 97.7%);
  #background-color: #ffffe9;
`;

const ColumnWrapper = styled(TypographyContainer)`
  img {
    align: right;
    text-align: right;
    width: 250px;
    height: 138px;
    height: auto;
  }
`;

const NameWrapper = styled(TypographyContainer)`
  font-size: 2.5rem;
`;

const TitleWrapper = styled(TypographyContainer)`
  font-size: 1.5rem;
`;

const jumpStartDockerHub = () => (
  <PageLayout>
    <Section background={(theme) => theme.light.bg} padding="xl">
      <center>
        <Grid columns={{ xs: 1, sm: 1, md: 4 }} gutter="xl">
          <ColumnWrapper style={{ gridColumn: "span 3", textAlign: "left" }}>
            <NameWrapper>
              Getting Started with Delta Lake: Docker Build
            </NameWrapper>
            <TitleWrapper>
              Build your own Docker image to try out Delta Lake
            </TitleWrapper>
          </ColumnWrapper>
        </Grid>
      </center>
    </Section>
    <Section background="white" centerHeader padding="xl">
      <Typography>
        <TitleWrapper>Building your docker image</TitleWrapper>
        You can build your own docker image locally if you want to test out
        different versions of Delta Lake, Apache Spark™, Rust, Python, or other
        APIs.
        <p />
        <ul>
          <li>
            Clone the{" "}
            <Link href="http://github.com/delta-io/delta-docs">Delta Docs</Link>{" "}
            repo
          </li>
          <li>Navigate to the cloned folder</li>
          <li>
            Navigate to the <code>quickstart_docker</code> folder
          </li>
          <li>
            Open a bash shell (if on windows use git, bash, WSL, or any shell
            configured for bash commands)
          </li>
          <li>
            Execute the following from the <code>static/quickstart_docker</code>{" "}
            folder
            <CodeBlock>
              docker build -t delta_quickstart -f Dockerfile_delta_quickstart .
            </CodeBlock>
          </li>
        </ul>
      </Typography>
    </Section>
    <Section background={(theme) => theme.light.bg} padding="xl">
      <Typography>
        <TitleWrapper>Image Entry Point</TitleWrapper>
        <p />
        Your entry point for this locally built docker file is
        <CodeBlock>
          docker run --name delta_quickstart --rm -it --entrypoint bash
          delta_quickstart
        </CodeBlock>
        Once the image has been built, you can then move on to running the
        quickstart in a notebook or shell.
        <p />
        <Link href="/learn/getting-started">Click here </Link> to return to{" "}
        <b>Getting Started</b>.
      </Typography>
    </Section>
    <Section background="white" centerHeader padding="xl">
      <Typography>
        <TitleWrapper>References</TitleWrapper>
        <ul>
          <li>
            <Link href="https://github.com/delta-io/delta-docs/tree/main/static/quickstart_docker#build-the-image">
              Delta Lake Docker image on GitHub
            </Link>
          </li>
        </ul>
      </Typography>
      <br />
    </Section>
  </PageLayout>
);

export default jumpStartDockerHub;
