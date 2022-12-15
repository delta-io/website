import * as React from "react";
import { useRef } from "react";
import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import Embed from "src/components/Embed";
import Link from "src/components/Link";

const breakpoints = {
  " 0": { slidesPerView: 1, slidesPerGroup: 1 },
  " 576": { slidesPerView: 1.5 },
  " 768": { slidesPerView: 3, slidesPerGroup: 3 },
  " 992": { slidesPerView: 3.5 },
  " 1200": { slidesPerView: 4, slidesPerGroup: 4 },
};
const cardMedia = Object.entries(breakpoints).map(
  (item) =>
    ` @media (min-width: ${item[0]}px) {  width: calc(100% / ${item[1].slidesPerView} )    };  `
);

const PageContainer = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;
  grid-template-columns: 100%;
  .swiper-slide {
    ${cardMedia};
    margin-right: 16px;
  }
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
  position: relative;
  padding: 0 30px;
`;

const Card = styled.div`
  width: 100%;
  display: inline-block;

  h6 {
    margin: 10px 0;
  }
  p {
    word-break: break-all;
    word-wrap: break-word;
  }
`;

const imageAspectRatio = "9 / 16";

const controlMedia = Object.entries(breakpoints).map(
  (item) =>
    ` @media (min-width: ${item[0]}px) {  margin-top: calc((50% - ${item[1].slidesPerView}rem) / ${item[1].slidesPerView} *  ${imageAspectRatio});  };`
);

const ButtonControl = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: #efefef;
  background-color: white;
  position: absolute;
  cursor: pointer;
  transform: translateY(-50%);
  ${controlMedia};
  margin-top: calc((50% - 2rem) * 9 / 16);
  top: 0;
  font-size: 0;
  z-index: 10;
  box-shadow: 0 4px 4px rgb(0 0 0 / 30%), 0 0 4px rgb(0 0 0 / 20%);
  ${(props) => (props.direction === "left" ? `left: -5px ` : "right:-5px")};

  &::before,
  ::after {
    content: "";
    height: 1px;
    background-color: #5d5d5d;
    position: absolute;
    left: 40%;
    width: 33%;
  }

  &::before {
    transform: rotate(45deg);
    ${(props) =>
      props.direction === "left"
        ? ` transform-origin: left; `
        : " transform-origin: right;"};
  }

  &::after {
    transform: rotate(-45deg);
    ${(props) =>
      props.direction === "left"
        ? ` transform-origin: left; `
        : " transform-origin: right;"};
  }

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    display: none;
  }
`;

const CardDataList = ({ cards }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <PageContainer>
      {cards.map((item) => (
        <PlayListSection key={item.id}>
          <CardTitle>{item.playlistTitle}</CardTitle>
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
              {item.videoCollection.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Card>
                    <Link href={slide.url}>
                      <Embed src={slide.thumbnails.high.url} />
                    </Link>
                    <h6>{slide.title}</h6>
                    <p>
                      {slide.description.length > 80
                        ? `${slide.description.slice(0, 80)}... `
                        : slide.description.length}
                    </p>
                  </Card>
                </SwiperSlide>
              ))}
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
      id: string.isRequired,
      playlistTitle: string.isRequired,
      videoCollection: arrayOf(
        shape({
          description: string,
          title: string,
          url: string,
        })
      ),
    })
  ).isRequired,
};
export default CardDataList;
