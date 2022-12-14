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
`;

const Card = styled.div`
  width: 100%;
  padding: 10px;
  border: solid red 1px;
  height: 400px;
`;

const CardDataList = ({ cards }) => {
  console.log("CardDataList_cards", cards);
  return (
    <PageContainer>
      {cards.map((item) => (
        <PlayListSection>
          <CardTitle>{item.playlistTitle}</CardTitle>
          <WrapperList>
            <Swiper
              modules={[Navigation]}
              loop
              // spaceBetween={32}
              slidesPerView={4}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {item.videoCollection.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Card>
                    <Link href={slide.url}>
                      <Embed
                        src={slide.thumbnails.high.url}
                        // aspectRatio={thumbnailRatio}
                        // maxWidth={maxWidth}
                      />
                    </Link>
                    <div>{slide.title}</div>
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
