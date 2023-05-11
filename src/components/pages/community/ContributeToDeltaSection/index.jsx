import * as React from "react";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";
import Link from "src/components/Link";
import { contributors } from "./contributors";

const ImageContainer = styled.div`
  width: 100%;
  height: 60px;
  position: relative;

  a {
    img {
      transition: 0.3s;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  img {
    max-width: 100%;
    position: absolute;
    max-height: 100%;
    max-width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ContributeToDeltaSection = () => (
  <Section
    title="Organizations that have contributed to Delta Lake"
    subtitle={
      <Typography variant="p">
        Together we have made Delta Lake the most widely used lakehouse format
        in the world!
      </Typography>
    }
    background="white"
    centeredHeader
    padding="xxxl"
  >
    <Grid columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} gutter="lg">
      {contributors?.map((item) => (
        <ImageContainer key={item.name}>
          {item.link ? (
            <Link href={item.link}>
              <img src={item.src} alt={item.name} />
            </Link>
          ) : (
            <img src={item.src} alt={item.name} />
          )}
        </ImageContainer>
      ))}
    </Grid>
  </Section>
);

export default ContributeToDeltaSection;
