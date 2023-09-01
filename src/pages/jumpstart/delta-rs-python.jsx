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

const jumpStartRsPython = () => (
  <PageLayout>
    <Section background={(theme) => theme.light.bg} padding="xl">
      <center>
        <Grid columns={{ xs: 1, sm: 1, md: 4 }} gutter="xl">
          <ColumnWrapper style={{ gridColumn: "span 3", textAlign: "left" }}>
            <NameWrapper>
              Getting Started with Delta Lake: Python (Rust)
            </NameWrapper>
            <TitleWrapper>
              Try Delta Lake using the delta-rs Python bindings
            </TitleWrapper>
          </ColumnWrapper>
        </Grid>
      </center>
    </Section>
    <Section background="white" centerHeader padding="xl">
      <Typography>
        <ul>
          <li>
            Open a bash shell (if on windows use git bash, WSL, or any shell
            configured for bash commands)
            <p />
          </li>
          <li>
            Run a container from the image with the bash entrypoint (
            <Link href="/jumpstart/docker-hub">DockerHub</Link> |{" "}
            <Link href="/jumpstart/docker-build">build</Link>)
            <p />
          </li>
          <li>
            Launch a <em>python</em> interactive shell session with{" "}
            <code>python3</code>
            <p />
            <QuoteWrapper>
              Note: The Delta Rust Python bindings are already installed in this
              docker. To do this manually in your own environment, run the
              command: <p />
              <CodeBlock>pip3 install deltalake==0.9.0</CodeBlock>
            </QuoteWrapper>
          </li>
          <li>
            <p />
          </li>
        </ul>
        <QuoteWrapper>
          The basic prerequisite for following along using Delta Lake Docker
          image is having Docker installed on your machine. Please follow the
          steps from the Docker website to install Docker locally. Based on your
          local machine operating system, please choose the appropriate option
          listed on the{" "}
          <Link href="https://docs.docker.com/get-docker/">Get Docker</Link>{" "}
          page.
        </QuoteWrapper>
        <p />
        To get started quickly, you can also download the image from DockerHub
        at{" "}
        <Link href="https://go.delta.io/dockerhub">Delta Lake DockerHub</Link>
        . <p /> Note, there are different versions of the Delta Lake docker:
        <p />
        <img src={deltaDockerImg} alt="Delta Docker Images" width="900" />
        <p />
        <QuoteWrapper>
          Note, the arm64 version is built for ARM64 platforms like Mac M1
        </QuoteWrapper>
        <p />
        Download the appropriate tag, e.g.:
        <ul>
          <li>
            For the standard Linux container:
            <CodeBlock>docker pull deltaio/delta-docker:latest</CodeBlock>{" "}
          </li>
          <li>
            For running this optimally on your Mac M1
            <CodeBlock>docker pull deltaio/delta-docker:latest_arm64</CodeBlock>
          </li>
        </ul>
        <p />
      </Typography>
    </Section>
    <Section background={(theme) => theme.light.bg} padding="xl">
      <Typography>
        <TitleWrapper>Image Entry Point</TitleWrapper>
        <p />
        Your entry point for the Docker Hub image is:
        <ul>
          <li>
            <b>Running locally on Mac M1</b>
            <br />
            <CodeBlock>
              docker run --name delta_quickstart --rm -it --entrypoint bash
              deltaio/delta-docker:latest_arm64
            </CodeBlock>
          </li>
          <li>
            <b>Running on Linux VM</b>
            <br />
            <CodeBlock>
              docker run --name delta_quickstart --rm -it --entrypoint bash
              deltaio/delta-docker:latest
            </CodeBlock>
          </li>
        </ul>
        Once the image has been built or you have downloaded the correct image,
        you can then move on to running the quickstart in a notebook or shell.
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
            <Link href="https://github.com/delta-io/delta-docs/tree/main/static/quickstart_docker#docker-hub">
              Delta Lake DockerHub on GitHub
            </Link>
          </li>
        </ul>
      </Typography>
      <br />
    </Section>
  </PageLayout>
);

export default jumpStartRsPython;
