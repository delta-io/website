import * as React from "react";
import { useRef, useState } from "react";
import {
  arrayOf,
  oneOfType,
  oneOf,
  shape,
  string,
  number,
  objectOf,
  object,
  bool,
} from "prop-types";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import Embed from "src/components/Embed";
import Link from "src/components/Link";
import { MdChevronLeft } from "@react-icons/all-files/md/MdChevronLeft";
import { MdChevronRight } from "@react-icons/all-files/md/MdChevronRight";

const PageContainer = styled.div`
  display: grid;
  gap: 2rem;

  width: 100%;
  grid-template-columns: 100%;
`;

const PlayListSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 0;
`;

const WrapperList = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  padding: 0 1rem;
`;

const Card = styled.div`
  width: 100%;
  //padding: 10px;
  //border: solid red 1px;
  height: 300px;
`;

const ButtonControl = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  cursor: pointer;
  top: 25%;
  z-index: 10;
  ${(props) => (props.direction === "left" ? `left: 0.5rem` : "right: 0.5rem")}
`;

const CardDataList = ({ cards }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <PageContainer>
      {cards.map((item) => (
        <PlayListSection>
          <CardTitle>{item.playlistTitle}</CardTitle>
          <WrapperList>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              // loop
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                576: { slidesPerView: 1.5 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 3.5 },
                1200: { slidesPerView: 4 },
              }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <ButtonControl direction="left" ref={navigationPrevRef}>
                <MdChevronLeft />
              </ButtonControl>
              {item.videoCollection.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Card>
                    <Link href={slide.url}>
                      <Embed src={slide.thumbnails.high.url} />
                    </Link>
                    <div>{slide.title}</div>
                  </Card>
                </SwiperSlide>
              ))}
              <ButtonControl direction="right" ref={navigationNextRef}>
                <MdChevronRight />
              </ButtonControl>
            </Swiper>
          </WrapperList>
        </PlayListSection>
      ))}
    </PageContainer>
  );
};

CardDataList.propTypes = {
  cards: arrayOf(
    shape({
      title: string.isRequired,
      url: string.isRequired,
      thumbnail: oneOfType([
        string,
        shape({
          // eslint-disable-next-line react/forbid-prop-types
          childImageSharp: object,
        }),
      ]).isRequired,
      description: string.isRequired,
      docs: string,
      source_code: string,
      meta: string,
      tags: arrayOf(string),
    })
  ).isRequired,
};

export default CardDataList;
