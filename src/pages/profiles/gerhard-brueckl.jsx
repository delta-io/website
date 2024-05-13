import * as React from "react";
import { useRef, useState } from "react";
import PageLayout from "src/components/PageLayout";
import { useOpen } from "src/hooks/useOpen";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import gerhardImg from "src/images/gerhard-brueckl/gerhard-brueckl.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Embed from "src/components/Embed";
import {
  ButtonControl,
  Card,
  CardButton,
  WrapperList,
} from "src/components/YoutubeCardDataList";
import { Modal } from "src/components/Modal/Modal";
import { YoutubeEmbed } from "src/components/YoutubeEmbed";
import { useNoScroll } from "src/hooks/useNoScroll";

const breakpoints = {
  " 0": { slidesPerView: 1, slidesPerGroup: 1 },
  " 576": { slidesPerView: 2 },
  " 768": { slidesPerView: 3, slidesPerGroup: 3 },
  " 992": { slidesPerView: 3 },
  " 1200": { slidesPerView: 4, slidesPerGroup: 4 },
};

const QuoteWrapper = styled.div`
  padding: 20px;
  background-color: hsl(191, 100%, 97.7%);
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

const getThumnbail = (videoId) =>
  `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

const videoCollection = [
  {
    title: "Deep-Dive into Delta Lake",
    url: "https://www.youtube.com/watch?v=de-6a6Bfw6E&ab_channel=Databricks",
    videoId: "de-6a6Bfw6E",
    thumbnail: getThumnbail("de-6a6Bfw6E"),
  },
  {
    title: "Databricks Meets Power BI",
    url: "https://www.youtube.com/watch?v=IEklNQ70SSY&ab_channel=Databricks",
    videoId: "IEklNQ70SSY",
    thumbnail: getThumnbail("IEklNQ70SSY"),
  },
  {
    title: "Delta Lake Community Hours (2022-06-09)",
    url: "https://www.youtube.com/watch?v=ZytlhuVGxso&t=2s&ab_channel=DeltaLake",
    videoId: "ZytlhuVGxso",
    thumbnail: getThumnbail("ZytlhuVGxso"),
  },
  {
    title: "Delta Lake Community Office Hours (2022-10-06)",
    url: "https://www.youtube.com/watch?v=Qk75gXDxzE8&t=544s&ab_channel=DeltaLake",
    videoId: "Qk75gXDxzE8",
    thumbnail: getThumnbail("Qk75gXDxzE8"),
  },
];

const ProfileGerhardBrueckl = () => {
  const [isEmbedId, setIsEmbedId] = useState(null);
  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useOpen(false);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const embedIdHandler = (embedId) => {
    setIsEmbedId(embedId);
    onOpenModal();
  };

  useNoScroll(isOpenModal);

  return (
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
                </QuoteWrapper>
              </Typography>
            </ColumnWrapper>
          </Grid>
        </center>
      </Section>
      <Section backkground="grey" centerHeader padding="xl">
        <Typography>
          We are excited to share that the Delta Lake contributor of the month
          is Gerhard Brueckl, Lead Data Engineer / Cloud Solution Architect at{" "}
          <Link href="https://paiqo.com/en/">paiqo GmbH</Link>! Located in
          Wolkersdorf, Austria, Gerhard is the key maintainer of the official{" "}
          <Link href="https://github.com/delta-io/delta/tree/master/connectors/powerbi">
            PowerBI connector for Delta Lake
          </Link>{" "}
          and various other OSS tools in that ecosystem.
        </Typography>
        <Typography>
          Gerhard possesses a strong background with the Microsoft Data Platform
          including Power BI, Azure, SQL Server and has been implementing
          traditional BI and data warehouse solutions based on the Microsoft
          Data Platform for over 15 years with a personal focus on analytical
          databases ever since. With the increased adoption of cloud
          technologies he transitioned to data engineering and building highly
          scalable big data platforms based on OSS technologies like HDFS, Spark
          and Delta Lake in the Microsoft Azure cloud.
        </Typography>
        <Typography>
          In July of 2016, Gerhard was a recipient of the Microsoft MVP, Most
          Valuable Professional, award which recognizes outstanding community
          leaders. In the Delta Lake community, Gerhard has often been seen as a
          panelist on the Delta Lake Community Office Hours and teaching users
          how to build their skills with analytical data platforms and big data.
          He also shares his knowledge as a speaker at various international
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
        <WrapperList>
          <ButtonControl direction="left" ref={navigationPrevRef}>
            slide left
          </ButtonControl>
          <ButtonControl direction="right" ref={navigationNextRef}>
            slide right
          </ButtonControl>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            watchOverflow
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={breakpoints}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {videoCollection.map((slide) => (
              <SwiperSlide key={slide.videoId}>
                <Card>
                  <CardButton onClick={() => embedIdHandler(slide.videoId)}>
                    <Embed src={slide.thumbnail} />
                    <span className="title">{slide?.title}</span>
                  </CardButton>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </WrapperList>
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
      </Section>
      {isOpenModal && (
        <Modal isOpenModal={isOpenModal} onClose={onCloseModal}>
          <YoutubeEmbed embedId={isEmbedId} />
        </Modal>
      )}
    </PageLayout>
  );
};

export default ProfileGerhardBrueckl;
