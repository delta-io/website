import * as React from "react";
import PageLayout from "src/components/PageLayout";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import gerhardImg from "src/images/gerhard-brueckl/gerhard-brueckl.jpg";
import deedDiveImg from "src/images/gerhard-brueckl/deep-dive-into-delta-lake.jpg";
import databricksMeetsImg from "src/images/gerhard-brueckl/databricks-meets-power-bi.jpg";
import meetImg1 from "src/images/gerhard-brueckl/delta-lake-community-hours-06-09.jpg";
import meetImg2 from "src/images/gerhard-brueckl/delta-lake-community-hours-10-06.jpg";

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

const VideoWrapper = styled(Link)`
  display: flex;
  flex-direction: column;

  span {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
`;

const profileFlorianValeye = () => (
  <PageLayout>
    <Section background="white" padding="xl">
      <center>
        <Grid columns={{ xs: 1, sm: 1, md: 4 }} gutter="xl">
          <ColumnWrapper>
            <img src={gerhardImg} alt="Gerhard Brueckl" />
          </ColumnWrapper>
          <ColumnWrapper style={{ gridColumn: "span 3" }}>
            <NameWrapper>Gerhard Brueckl</NameWrapper>
            <TitleWrapper>
              Lead Data Engineer / Cloud Solution Architect at{" "}
              <a href="https://paiqo.com/en/">paiqo GmbH</a>
            </TitleWrapper>
            <Typography variant="p">
              <br />
              <QuoteWrapper>
                <em>
                  &#34;Contributing to something you use on a daily basis not
                  only makes you learn the topic in depth but also further
                  drives it and thereby also your success.&#34;
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
        We are excited to share that the Delta Lake contributor of the month for
        February is Gerhard Brueckl, Lead Data Engineer / Cloud Solution
        Architect at <Link href="https://paiqo.com/en/">paiqo GmbH</Link>!/
        Located in Wolkersdorf, Austria, Gerhard is the key maintainer of the
        official{" "}
        <Link href="https://github.com/delta-io/connectors/tree/master/powerbi">
          PowerBI connector for Delta Lake
        </Link>{" "}
        and various other OSS tools in that ecosystem.
      </Typography>
      <Typography>
        Gerhard possesses a strong background with the Microsoft Data Platform
        including Power BI, Azure, SQL Server and has been implementing
        traditional BI and data warehouse solutions based on the Microsoft Data
        Platform for over 15 years with a personal focus on analytical databases
        ever since. With the increased adoption of cloud technologies he
        transitioned to data engineering and building highly scalable big data
        platforms based on OSS technologies like HDFS, Spark and Delta Lake in
        the Microsoft Azure cloud.
      </Typography>
      <Typography>
        In July of 2016, Gerhard was a recipient of the Microsoft MVP, Most
        Valuable Professional, award which recognizes outstanding community
        leaders. In the Delta Lake community, Gerhard has often been seen as a
        panelist on the Delta Lake Community Office Hours and teaching users how
        to build their skills with analytical data platforms and big data. He
        also shares his knowledge as a speaker at various international
        conferences and via his blog.
      </Typography>
      <h4>OSS Contributions</h4>
      <p>
        <Link href="https://marketplace.visualstudio.com/items?itemName=paiqo.databricks-vscode">
          Databricks VSCode Extension
        </Link>
      </p>
      <p>
        <Link href="https://www.powershellgallery.com/packages/DatabricksPS/1.11.0.5">
          DatabricksPS Powershell Module
        </Link>
      </p>
    </Section>
    <Section background="white" centerHeader padding="xl">
      <Typography variant="h3">References</Typography>
      <br />

      <Grid columns={{ md: 3 }} gutter="lg">
        <VideoWrapper
          href="https://www.youtube.com/watch?v=de-6a6Bfw6E&ab_channel=Databricks"
          muted
        >
          <span>
            <b>Deep-Dive into Delta Lake</b>
          </span>
          <img src={deedDiveImg} alt="" width="300" />
        </VideoWrapper>
        <VideoWrapper
          href="https://www.youtube.com/watch?v=IEklNQ70SSY&ab_channel=Databricks"
          muted
        >
          <span>
            <b>Databricks Meets Power BI</b>
          </span>
          <ImgWrapper>
            <img src={databricksMeetsImg} alt="" width="300" />
          </ImgWrapper>
        </VideoWrapper>
        <VideoWrapper
          href="https://www.youtube.com/watch?v=ZytlhuVGxso&t=2s&ab_channel=DeltaLake"
          muted
        >
          <span>
            <b>Delta Lake Community Hours (2022-06-09)</b>
          </span>
          <ImgWrapper>
            <img src={meetImg1} alt="" width="300" />
          </ImgWrapper>
        </VideoWrapper>
        <VideoWrapper
          href="https://www.youtube.com/watch?v=Qk75gXDxzE8&t=544s&ab_channel=DeltaLake"
          muted
        >
          <span>
            <b>Delta Lake Community Office Hours (2022-10-06)</b>
          </span>
          <ImgWrapper>
            <img src={meetImg2} alt="" width="300" />
          </ImgWrapper>
        </VideoWrapper>
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
