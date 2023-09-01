import * as React from "react";
import Typography from "src/components/Typography";
import LakeSection from "src/components/pages/shared/LakeSection";

const HeaderSection = () => (
  <LakeSection
    title="Getting Started with Delta Lake"
    subtitle={
      <Typography variant="p">
        This guide contains instructions and materials to get started with Delta
        Lake <br /> and work through the quickstart materials using a
        self-contained Docker image.
      </Typography>
    }
    padding="xxl"
    centeredHeader
  />
);

export default HeaderSection;
