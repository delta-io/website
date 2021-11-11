/* eslint-disable react/no-danger */
import * as React from "react";
import Button from "src/components/Button";
import Grid from "src/components/Grid";
import Section from "src/components/Section";
import Typography, { TypographyContainer } from "src/components/Typography";
import styled from "styled-components";
import arrowDown from "./arrow-down.png";
import arrowRight from "./arrow-right.png";

const parquetCode = `dataframe
  .write
  .format(<span class="color-parquet">"parquet"</span>)
  .save("/data")`;

const deltaCode = `dataframe
  .write
  .format(<span class="color-delta">"delta"</span>)
  .save("/data")`;

const ArrowDown = styled.img`
  margin: ${(props) => props.theme.spacing.xl} 0;
  line-height: 0;
  width: 24px;
  height: 52px;

  ${(props) => props.theme.mediaBreakpointUp("md")(`display: none;`)}
`;

const ArrowRight = styled.img`
  display: none;

  ${(props) =>
    props.theme.mediaBreakpointUp("md")(`
    display: block;
    flex: 0 0 52px;
    margin: 0 ${props.theme.spacing.xxl};
    line-height: 0;
    width: 52px;
    height: 24px;
  `)}
`;

const GetStartedSectionRoot = styled(Section)`
  padding-top: 0;
  text-align: center;

  .color-parquet {
    color: #d50000;
  }

  .color-delta {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const GetStartedSectionContent = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};

  ${(props) =>
    props.theme.mediaBreakpointUp("md")(`
    display: flex;
    justify-content: center;
    align-items: center;
  `)}
`;

const GetStartedSectionCodeBlock = styled.pre`
  text-align: left;
  padding: ${(props) => `${props.theme.spacing.xl} ${props.theme.spacing.xl}`};
  background-color: ${(props) => props.theme.light.bg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  font-weight: ${(props) => props.theme.fontWeightBold};
  display: flex;

  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
    padding: ${props.theme.spacing.xl} ${props.theme.spacing.xxl};
  `)}

  code {
    flex: 0 0 auto;
    font-size: ${(props) => props.theme.fontSizes.primary};
    margin: 0 auto;
  }
`;

const GetStartedSection = (props) => {
  const { ctaLabel, ctaUrl } = props;

  return (
    <GetStartedSectionRoot
      padding="xxxl"
      background="white"
      subtitle={
        <TypographyContainer>
          <Typography variant="h4">
            Instead of <span className="color-parquet">parquet</span>, simply
            say <span className="color-delta">delta</span>
          </Typography>
        </TypographyContainer>
      }
      centeredHeader
    >
      <GetStartedSectionContent>
        <Grid columns={1} gutter="md">
          <GetStartedSectionCodeBlock>
            <code dangerouslySetInnerHTML={{ __html: parquetCode }} />
          </GetStartedSectionCodeBlock>
        </Grid>
        <ArrowDown src={arrowDown} />
        <ArrowRight src={arrowRight} />
        <Grid columns={1} gutter="md">
          <GetStartedSectionCodeBlock>
            <code dangerouslySetInnerHTML={{ __html: deltaCode }} />
          </GetStartedSectionCodeBlock>
        </Grid>
      </GetStartedSectionContent>
      <Button href={ctaUrl}>{ctaLabel}</Button>
    </GetStartedSectionRoot>
  );
};

export default GetStartedSection;
