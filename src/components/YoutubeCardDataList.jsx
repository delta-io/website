import * as React from "react";
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
import { ControlSwiperButton } from "src/components/ControlSwiperButton";

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

// "bg-white hidden smd:flex cursor-pointer transition w-8 h-8 shadow-dashBoardCard rounded-full absolute top-1/2 -mt-4 z-10";

const CardDataList = ({ cards }) => {
  console.log("CardDataList_cards", cards);
  return (
    <PageContainer>
      {cards.map((item) => (
        <PlayListSection>
          <CardTitle>{item.playlistTitle}</CardTitle>
          <WrapperList>
            <ControlSwiperButton direction="left" />
            <Swiper
              modules={[Navigation]}
              loop
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
            </Swiper>
            <ControlSwiperButton direction="right" />
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
