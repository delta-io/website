import * as React from "react";
import Typography from "src/components/Typography";
import LakeSection from "../LakeSection";
import SocialTiles from "../SocialTiles";

// const CommunityTile = styled(Link)`
//   display: flex;
//   flex-flow: column;
//   align-items: center;
//   font-size: ${(props) => props.theme.fontSizes.primary};
//   background-color: white;
//   padding: ${(props) => props.theme.spacing.lg};
//   text-align: center;
//   color: inherit;
//   text-decoration: none;
//   white-space: nowrap;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
//   color: ${(props) => props.theme.light.color};
//   width: 160px;
//   transition: transform 250ms ease-out;
//   margin-left: auto;
//   margin-right: auto;

//   img {
//     display: block;
//     width: 100%;
//     height: auto;
//     max-width: 65px;
//     margin-bottom: ${(props) => props.theme.spacing.md};
//   }

//   &:hover {
//     transform: scale(1.02);
//   }
// `;

const CommunitySection = () => (
  <LakeSection
    title="Join the Delta Lake Community"
    subtitle={
      <Typography variant="p">
        Communicate with fellow Delta Lake users and contributors, ask questions
        and share tips.
      </Typography>
    }
    padding="xxxl"
    centeredHeader
  >
    <SocialTiles alignCenter dark />
  </LakeSection>
);

export default CommunitySection;
