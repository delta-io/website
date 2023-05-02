import * as React from "react";
import { useRef, useState } from "react";
import PageLayout from "src/components/PageLayout";
import { useOpen } from "src/hooks/useOpen";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import profileImg from "src/images/tyler-croy/Tyler-Croy-min.jpg";
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
import streamingImg from "./images/streaming-data.jpg";

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

const CommunityWrapper = styled(Typography)`
  margin-top: 1rem;
`;

const LinkButton = styled(CardButton)`
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
`;

const getThumnbail = (videoId) =>
  `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

const videoCollection = [
  {
    title: "Growing the Delta Ecosystem to Rust and Python with Delta-RS",
    url: "https://www.youtube.com/watch?v=scYz12UK-OY&ab_channel=Databricks",
    videoId: "scYz12UK-OY",
    thumbnail: getThumnbail("scYz12UK-OY"),
  },
  {
    title: "From Hadoop to Delta Lake and Glue for Streaming and Batch",
    url: "https://www.youtube.com/watch?v=6KYT8ZmaaSE&ab_channel=Databricks",
    videoId: "6KYT8ZmaaSE",
    thumbnail: getThumnbail("6KYT8ZmaaSE"),
  },
  {
    title: "Streaming data in and out of Delta Lake",
    url: "https://tech.scribd.com/blog/2020/streaming-with-delta-lake.html",
    thumbnail: streamingImg,
  },
  {
    title: "D3L2: The Inception of Delta Rust",
    url: "https://www.youtube.com/watch?v=2jgfpJD5D6U&t=1285s&ab_channel=DeltaLake",
    videoId: "2jgfpJD5D6U",
    thumbnail: getThumnbail("2jgfpJD5D6U"),
  },
];

const ProfileTylerCroy = () => {
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
              <img src={profileImg} alt="R. Tyler Croy" />
            </ColumnWrapper>
            <ColumnWrapper style={{ gridColumn: "span 3", textAlign: "left" }}>
              <NameWrapper>R. Tyler Croy</NameWrapper>
              <TitleWrapper>
                Lead the Platform Engineering organization at Scribd
              </TitleWrapper>
              <Typography variant="p">
                <br />
                <QuoteWrapper>
                  <em>
                    &#34;From my perspective, it’s only the beginning with
                    delta-rs. Delta Lake is a deceptively simple technology with
                    tremendous potential across the data platform.&#34;
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
          Meet R. Tyler Croy, Delta Lake Contributor of the Month! R. Tyler Croy
          leads the Platform Engineering organization at Scribd and has been an
          open source developer for over 14 years. His open source work has been
          in the FreeBSD, Python, Ruby, Puppet, Jenkins, and now Delta Lake
          communities. The Platform Engineering team at Scribd has invested
          heavily in Delta and has been building new open source projects to
          expand the reach of Delta Lake across the organization.
        </Typography>
        <Typography>
          In recent years, Tyler’s main focus has been in the Delta Lake and
          Rust communities, exploring the potential use-cases for Rust in high
          concurrency data processing and ingestion. In fact, Tyler and his team
          at Scribd was the genesis of Delta Rust. Tyler has a Delta Rust code
          development stream on{" "}
          <Link href="https://www.twitch.tv/agentdero/videos">Twitch</Link> .
          When Tyler isn’t working on code, he is involved in many of the other
          aspects of the Delta Lake project. Tyler has been seen in a variety of
          Delta Lake videos to educate the community and share the latest
          updates and also publishing Delta Lake-focused blogs. Thank you for
          all you do, Tyler!
        </Typography>
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
                  {slide.videoId ? (
                    <CardButton onClick={() => embedIdHandler(slide.videoId)}>
                      <Embed src={slide.thumbnail} />
                      <span className="title">{slide?.title}</span>
                    </CardButton>
                  ) : (
                    <LinkButton
                      as="a"
                      href={slide.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={slide.thumbnail}
                        alt={slide.title}
                        height="138px"
                      />
                      <span className="title">{slide?.title}</span>
                    </LinkButton>
                  )}
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </WrapperList>
        <CommunityWrapper>
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
        </CommunityWrapper>
      </Section>
      {isOpenModal && (
        <Modal isOpenModal={isOpenModal} onClose={onCloseModal}>
          <YoutubeEmbed embedId={isEmbedId} />
        </Modal>
      )}
    </PageLayout>
  );
};

export default ProfileTylerCroy;
