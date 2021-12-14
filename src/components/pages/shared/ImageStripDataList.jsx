import * as React from "react";
import { string, number } from "prop-types";
import useDataList from "src/hooks/useDataList";
import ImageStrip from "src/components/ImageStrip";

const ImageStripDataList = (props) => {
  const { data: dataList, first } = props;

  const data = useDataList(dataList);

  if (!data) {
    return null;
  }

  return <ImageStrip items={data.slice(0, first || -1)} />;
};

ImageStripDataList.defaultProps = {
  first: undefined,
};

ImageStripDataList.propTypes = {
  data: string.isRequired,
  first: number,
};

export default ImageStripDataList;
