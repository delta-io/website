import * as React from "react";
import Typography from "src/components/Typography";
import LakeSection from "../LakeSection";
import SocialTiles from "../SocialTiles";

const CommunitySection = () => (
  <LakeSection
    title="Join the Delta Lake Community"
    subtitle={
      <Typography variant="p">
        Delta Lake is supported by more than 190 developers from over 70
        organizations across multiple repositories.
        <br />
        Chat with fellow Delta Lake users and contributors, ask questions and
        share tips.
      </Typography>
    }
    padding="xxl"
    centeredHeader
  >
    <SocialTiles alignCenter dark />
  </LakeSection>
);

export default CommunitySection;
