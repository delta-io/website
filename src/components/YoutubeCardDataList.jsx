import * as React from "react";
import { useRef, useState } from "react";
import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import Embed from "src/components/Embed";
import { Modal } from "src/components/Modal/Modal";
import { YoutubeEmbed } from "src/components/YoutubeEmbed";

const breakpoints = {
  " 0": { slidesPerView: 1, slidesPerGroup: 1 },
  " 576": { slidesPerView: 2 },
  " 768": { slidesPerView: 3, slidesPerGroup: 3 },
  " 992": { slidesPerView: 3 },
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

export const PlayListSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 0;
`;

export const WrapperList = styled.div`
  width: 100%;
  position: relative;
  padding: 0 30px;
`;

export const CardButton = styled.button`
  display: inline-block;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: start;

  .title {
    display: block;
    margin-top: 10px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const CardDescription = styled.span`
  display: block;
  margin-top: 10px;
`;

export const Card = styled.div`
  width: 100%;
  display: inline-block;

  a {
    text-decoration: none;
    color: black;

    &:hover,
    :focus {
      color: black;
    }
  }

  .title {
    display: block;
    margin-top: 10px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const imageAspectRatio = "9 / 16";

const controlMedia = Object.entries(breakpoints).map(
  (item) =>
    ` @media (min-width: ${item[0]}px) {  margin-top: calc((50% - ${item[1].slidesPerView}rem) / ${item[1].slidesPerView} *  ${imageAspectRatio});  };`
);

export const ButtonControl = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: #efefef;
  background-color: ${(props) => props.theme.dark.color};
  position: absolute;
  cursor: pointer;
  transform: translateY(-50%);
  ${controlMedia};
  margin-top: calc((50% - 2rem) * 9 / 16);
  top: 0;
  font-size: 0;
  z-index: 10;
  box-shadow: 0 4px 4px rgb(0 0 0 / 30%), 0 0 4px rgb(0 0 0 / 20%);
  ${(props) => (props.direction === "left" ? `left: 20px ` : "right:20px")};

  &::before,
  ::after {
    content: "";
    height: 1px;
    background-color: ${(props) => props.theme.colors.textSecondary};
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
    background-color: ${(props) => props.theme.colors.bgLight};

    &::before,
    &::after {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }

  &:disabled {
    display: none;
  }
`;

const shortedDescription = (str, characters) => {
  const shortedStr = str.slice(0, characters);

  const arr = shortedStr.split(" ");
  arr.pop();

  return `${arr.join(" ")}...`;
};

const YoutubeCardDataList = ({ cards }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEmbedId, setIsEmbedId] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const modalOpenHandler = () => setIsOpenModal(true);
  const modalCloseHandler = () => setIsOpenModal(false);

  const embedIdHandler = (embedId) => {
    setIsEmbedId(embedId);
    modalOpenHandler();
  };

  return (
    <>
      <PageContainer>
        {cards.map((item) => (
          <PlayListSection key={item.id}>
            {item.playlistTitle && <CardTitle>{item.playlistTitle}</CardTitle>}
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
                      {item.playlistId === "manually_added_playlist_id" ? (
                        <a href={slide.url}>
                          <Embed src={slide.thumbnail} />
                          <span className="title">{slide.title}</span>
                          <CardDescription playlistId={item.playlistId}>
                            {slide.description}
                          </CardDescription>
                        </a>
                      ) : (
                        <CardButton
                          onClick={() => embedIdHandler(slide.videoId)}
                        >
                          <Embed src={slide.thumbnail?.high?.url} />
                          <span className="title">{slide.title}</span>
                          <CardDescription playlistId={item.playlistId}>
                            {shortedDescription(slide.description, 100)}
                          </CardDescription>
                        </CardButton>
                      )}
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </WrapperList>
          </PlayListSection>
        ))}
      </PageContainer>
      {isOpenModal && (
        <Modal open={isOpenModal} onClose={modalCloseHandler}>
          <YoutubeEmbed embedId={isEmbedId} />
        </Modal>
      )}
    </>
  );
};

YoutubeCardDataList.propTypes = {
  cards: arrayOf(
    shape({
      id: string,
      playlistTitle: string,
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
export default YoutubeCardDataList;
