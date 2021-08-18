import * as React from "react";
import {
  arrayOf,
  oneOfType,
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
  margin-bottom: ${(props) => props.theme.spacing.md};

  a {
    margin-top: auto;
    display: block;
  }
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

const CardTag = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.theme.spacing.md};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const CardDataList = (props) => {
  const { columns, cards, thumbnailRatio, maxWidth, readMoreLabel } = props;

  if (!cards.length) {
    return null;
  }

  return (
    <Grid columns={columns} gutter="lg">
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
              <Link href={card.url}>{card.title}</Link>
            </CardTitle>
            {card.meta && <CardContent variant="p2">{card.meta}</CardContent>}
            <CardContent variant="p2">{card.description}</CardContent>
            {card.tags?.length && (
              <CardContent variant="p2">
                {card.tags.map((tag) => (
                  <CardTag key={tag}>{tag}</CardTag>
                ))}
              </CardContent>
            )}
            <Link href={card.url}>{readMoreLabel}</Link>
          </TypographyContainer>
        </div>
      ))}
    </Grid>
  );
};

CardDataList.defaultProps = {
  readMoreLabel: "Read more",
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
      meta: string,
      tags: arrayOf(string),
    })
  ).isRequired,
  thumbnailRatio: arrayOf(number).isRequired,
  readMoreLabel: string,
  maxWidth: string,
};

export default CardDataList;
