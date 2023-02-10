import * as React from "react";
import PageLayout from "src/components/PageLayout";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import profileImg from "src/images/florian-valeye/florian-valeye.jpeg";
import d3l2Img from "src/images/florian-valeye/d3l2-florian-valeye.jpg";
import blogImg from "src/images/florian-valeye/subscriptions-on-a-delta-lake.png";

const QuoteWrapper = styled.div`
  padding: xxxl;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  background-color: hsl(191, 100%, 97.7%);
`;

const ImgWrapper = styled.div`
  border-left: solid 1px black;
  border-right: solid 1px black;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  width: 303px;
`;

const ColumnWrapper = styled(TypographyContainer)`
  text-align: left;
  vertical-align: top;
  margin: 0;
  padding: 0;
  img {
    align: right;
    text-align: right;
    width: 250px;
    height: auto;
  }
`;

const NameWrapper = styled(TypographyContainer)`
  font-size: 2.5rem;
`;

const TitleWrapper = styled(TypographyContainer)`
  font-size: 1.5rem;
`;

const profileFlorianValeye = () => (
  <PageLayout>
    <Section background="white" padding="xl">
      <center>
        <Grid columns={{ xs: 1, sm: 1, md: 4 }} gutter="xl">
          <ColumnWrapper>
            <img src={profileImg} alt="Florian Valeye" />
          </ColumnWrapper>
          <ColumnWrapper style={{ gridColumn: "span 3" }}>
            <NameWrapper>Florian Valeye</NameWrapper>
            <TitleWrapper>
              Delta Lake Maintainer, Staff Data Engineer at Back Market
            </TitleWrapper>
            <Typography variant="p">
              <br />
              <QuoteWrapper>
                <em>
                  &#34;Contributing to open source is key to learning how to
                  solve problems within worldwide, benevolent communities of
                  people.&#34;
                </em>
                <br />
                <br />
                Source: &nbsp;
                <Link href="https://project.linuxfoundation.org/hubfs/LF%20Research/2022%20Linux%20Foundation%20Annual%20Report.pdf?hsLang=en">
                  Linux Foundation 2022 Annual Report
                </Link>
              </QuoteWrapper>
            </Typography>
          </ColumnWrapper>
        </Grid>
      </center>
    </Section>
    <Section backkground="grey" centerHeader padding="xl">
      <Typography>
        Maintainers are key to an open-source project like Delta Lake since they
        manage contributions and work with the developer community to further
        the direction of the project. They are vital to the success of the
        open-source project and are committed to improving it. In this blog
        post, we will be highlighting a lead maintainer at Delta Lake, &nbsp;
        <Link href="https://www.linkedin.com/in/florianvaleye/">
          Florian Valeye
        </Link>
        .
      </Typography>
      <Typography>
        Florian Valeye is a Data Engineering Manager at Back Market and
        maintainer to{" "}
        <Link href="http://github.com/delta-io/delta-rs">delta-rs</Link>, a
        native Rust library for Delta Lake. Passionate about everything data,
        Florian leads data projects to help businesses make the right
        data-driven decisions. As an open-source enthusiast, Florian shares his
        knowledge with others to help them grow in their roles. Florian
        possesses two Masters Degrees, one in Management of Technology and
        Innovation and the other in Engineering Specialized in Computer Science
        and Networks. In January 2021, Florian became a Delta Lake Maintainer.
        In fact, he was one of the first contributors of the Delta Lake 1.0
        release.
      </Typography>
      <Typography>
        Florian and the engineering team at{" "}
        <Link href="https://www.backmarket.com/">Back Market</Link> have been
        important contributors to the Delta Rust API and associated{" "}
        <Link href="https://delta-io.github.io/delta-rs/python/">
          Python bindings
        </Link>
        . They have been actively involved in Delta Lake Community Office Hours,
        contributors to the{" "}
        <Link href="https://github.com/aws/aws-sdk-pandas">aws-pandas-sdk</Link>{" "}
        and{" "}
        <Link href="https://github.com/awslabs/aws-athena-query-federation/pull/509">
          AWS Labs Athena Federation
        </Link>
        , reviewing code, and even Delta Lake partnerships with Google BigQuery.
        In 2022, Florian Valeye led the Back Market team to be a finalist for
        the{" "}
        <Link href="https://www.databricks.com/blog/2022/06/15/defining-the-future-of-data-ai-announcing-the-finalists-for-the-2022-databricks-data-team-oss-award.html">
          Data Team OSS Award
        </Link>
        &nbsp; which celebrates those who are making the most out of leveraging,
        or contributing to, the open-source technologies that are defining the
        future of data and AI.
      </Typography>
    </Section>
    <Section background="white" centerHeader padding="xl">
      <Typography variant="h3">References</Typography>
      <br />

      <Grid columns={{ md: 3 }} gutter="xxl">
        <Typography>
          <Link href="https://youtu.be/7mPbgJajHR0" muted>
            <b>
              D3L2: delta-rs at Back Market: Python and Rust, the best of both
              worlds
            </b>
            <img src={d3l2Img} alt="" width="300" />
          </Link>
        </Typography>
        <Typography>
          <Link
            href="https://engineering.backmarket.com/subscriptions-on-a-delta-lake-fd4290b7a66a"
            muted
          >
            <b>Subscriptions on a Delta Lake: Serve data with delta-rs</b>
            <ImgWrapper>
              <img src={blogImg} alt="" width="300" />
            </ImgWrapper>
          </Link>
        </Typography>
        <Typography>
          <h4>Community Office Hours</h4>-{" "}
          <Link href="https://youtu.be/4OK7jpzj5yM">
            Delta Lake COH (2002-12-15)
          </Link>
          <br />-{" "}
          <Link href="https://youtu.be/LaKcKagdwHY">
            Delta Lake COH (2022-09-08)
          </Link>
          <br />-{" "}
          <Link href="https://youtu.be/-KBbECH-oKQ">
            Delta Lake COH (2022-03-03)
          </Link>
        </Typography>
      </Grid>
    </Section>
  </PageLayout>
);

export default profileFlorianValeye;
