import * as React from "react";
import { arrayOf, shape, string, number, objectOf } from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";
import Grid from "src/components/Grid";
import Typography, { TypographyContainer } from "./Typography";

const ThumbnailContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.md};

  a {
    margin-top: auto;
    display: block;
  }

  img {
    margin-top: auto;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    !props.size &&
    `padding-top: ${(props.aspectRatio[1] / props.aspectRatio[0]) * 100}%;`}
  background-color: ${(props) => props.theme.border};
  ${(props) =>
    props.size &&
    `
    width: ${props.size[0]};
    height: ${props.size[1]};

    img {
      width: auto;
      height: auto;
      max-width: ${props.size[0]};
      max-height: ${props.size[1]};
    }
  `};
`;

const CardTitle = styled(Typography)`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CardContent = styled(Typography)`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const CardDataList = (props) => {
  const { columns, cards, thumbnailRatio, thumbnailSize, readMoreLabel } =
    props;

  if (!cards.length) {
    return null;
  }

  return (
    <Grid columns={columns} gutter="lg">
      {cards.map((card) => (
        <div key={card.url}>
          <ThumbnailContainer aspectRatio={thumbnailRatio} size={thumbnailSize}>
            <Link to={card.url}>
              <img src={card.thumbnail} alt={card.title} />
            </Link>
          </ThumbnailContainer>
          <TypographyContainer>
            <CardTitle variant="h4">
              <Link to={card.url}>{card.title}</Link>
            </CardTitle>
            {card.meta && <CardContent variant="p2">{card.meta}</CardContent>}
            <CardContent variant="p2">{card.description}</CardContent>
            {card.tags?.length && (
              <CardContent variant="p2">
                {card.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </CardContent>
            )}
            <Link to={card.url}>{readMoreLabel}</Link>
          </TypographyContainer>
        </div>
      ))}
    </Grid>
  );
};

CardDataList.defaultProps = {
  readMoreLabel: "Read more",
  thumbnailRatio: [16, 9],
  thumbnailSize: undefined,
};

CardDataList.propTypes = {
  columns: objectOf(number).isRequired,
  cards: arrayOf(
    shape({
      title: string.isRequired,
      url: string.isRequired,
      thumbnail: string.isRequired,
      description: string.isRequired,
      meta: string,
      tags: arrayOf(string),
    })
  ).isRequired,
  thumbnailRatio: arrayOf(number),
  readMoreLabel: string,
  thumbnailSize: arrayOf(string),
};

export default CardDataList;
