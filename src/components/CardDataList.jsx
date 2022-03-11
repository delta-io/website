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
} from "prop-types";
import Link from "src/components/Link";
import styled from "styled-components";
import Grid from "src/components/Grid";
import Typography, { TypographyContainer } from "src/components/Typography";
import Embed from "src/components/Embed";

const ThumbnailContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};

  a {
    margin-top: auto;
    display: block;
  }

  &:hover ~ ${TypographyContainer} a {
    text-decoration: underline;
  }
`;

const CardTitle = styled(Typography)`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const CardContent = styled(Typography)`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  ${(props) =>
    props.lineClamp &&
    `
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props.lineClamp};
  overflow: hidden;
  `}
`;

const CardTag = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.theme.spacing.md};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const CardDataList = (props) => {
  const {
    columns,
    cards,
    density,
    thumbnailRatio,
    maxWidth,
    clampDescriptionLines,
  } = props;

  if (!cards.length) {
    return null;
  }

  let gutter = "lg";

  if (density === "dense") {
    gutter = "md";
  }

  if (density === "relaxed") {
    gutter = "xl";
  }

  return (
    <Grid columns={columns} gutter={gutter}>
      {cards.map((card) => (
        <div key={card.url}>
          <ThumbnailContainer>
            <Link href={card.url}>
              <Embed
                src={card.thumbnail}
                aspectRatio={thumbnailRatio}
                maxWidth={maxWidth}
              />
            </Link>
          </ThumbnailContainer>
          <TypographyContainer>
            <CardTitle variant="h4">
              <Link href={card.url} muted>
                {card.title}
              </Link>
            </CardTitle>
            {card.meta && (
              <>
                <CardContent variant="p2">{card.meta}</CardContent>
                <Typography variant="hr" density="dense" />
              </>
            )}
            <CardContent variant="p2" lineClamp={clampDescriptionLines}>
              <Link href={card.docs} muted>
                docs
              </Link>{" "}
              |
              <Link href={card.reference} muted>
                {" "}
                reference
              </Link>
              {card.tags?.length && (
                <CardContent variant="p2">
                  {card.tags.map((tag) => (
                    <CardTag key={tag}>{tag}</CardTag>
                  ))}
                </CardContent>
              )}
              {card.description}
            </CardContent>
          </TypographyContainer>
        </div>
      ))}
    </Grid>
  );
};

CardDataList.defaultProps = {
  clampDescriptionLines: undefined,
  density: undefined,
  maxWidth: undefined,
};

CardDataList.propTypes = {
  columns: objectOf(number).isRequired,
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
      reference: string,
      version: string,
      meta: string,
      tags: arrayOf(string),
    })
  ).isRequired,
  clampDescriptionLines: number,
  density: oneOf(["dense", "relaxed"]),
  thumbnailRatio: arrayOf(number).isRequired,
  maxWidth: string,
};

export default CardDataList;
