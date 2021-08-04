import * as React from "react";
import Section from "src/components/Section";
import Grid from "src/components/Grid";
import Typography, { TypographyContainer } from "src/components/Typography";
import { Link } from "gatsby";
import styled from "styled-components";
import linuxFoundation from "./linux-foundation.png";

const ProjectGovernanceSectionGrid = styled(Grid)`
  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
    align-items: center;
  `)}
`;

const ProjectGovernanceSection = () => (
  <Section padding="xxl">
    <ProjectGovernanceSectionGrid columns={{ xs: 1, lg: [1, 3] }}>
      <img
        src={linuxFoundation}
        alt="The Linux Foundation"
        width="241"
        height="81"
      />
      <TypographyContainer>
        <Typography variant="h5">Project Governance</Typography>
        <Typography variant="p">
          Delta Lake is an independent open-source project and not controlled by
          any single company. To emphasize this we joined the Delta Lake Project
          in 2019, which is a sub-project of the Linux Foundation Projects.
          Within the project, we make decisions based on{" "}
          <Link to="/pdfs/delta-charter.pdf">these rules</Link>.
        </Typography>
      </TypographyContainer>
    </ProjectGovernanceSectionGrid>
  </Section>
);

export default ProjectGovernanceSection;
