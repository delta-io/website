import * as React from "react";
import { number, string } from "prop-types";
// import CardDataList from "src/components/CardDataList";
import YoutubeCardDataList from "src/components/YoutubeCardDataList";
import useDataList from "src/hooks/useDataList";

const dataListProps = {
  connectors: {
    thumbnailRatio: [1, 1],
    columns: { xs: 1, md: 2, lg: 3 },
  },
  videos: {
    thumbnailRatio: [16, 9],
    columns: { xs: 1, md: 2 },
  },
  videosYoutube: {
    // thumbnailRatio: [16, 9],
    columns: { xs: 1, md: 2 },
  },
  meetings: {
    thumbnailRatio: [16, 9],
    columns: { xs: 1, md: 2, lg: 3 },
  },
  tutorials: {
    thumbnailRatio: [16, 9],
    columns: { xs: 1, md: 2 },
  },
  tutorialsYoutube: {
    // thumbnailRatio: [16, 9],
    columns: { xs: 1, md: 2 },
  },
};

const YoutubeJsonCardDataList = (props) => {
  const { data: dataList, first } = props;
  let cards = useDataList(dataList);

  if (first) {
    cards = cards.slice(0, first);
  }

  if (!cards) {
    return null;
  }

  return (
    <YoutubeCardDataList
      cards={cards}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dataListProps[dataList]}
    />
  );
};

YoutubeJsonCardDataList.defaultProps = {
  first: undefined,
};

YoutubeJsonCardDataList.propTypes = {
  data: string.isRequired,
  first: number,
};

export default YoutubeJsonCardDataList;
