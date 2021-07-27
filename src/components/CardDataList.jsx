import * as React from "react";
import { arrayOf, shape, string } from "prop-types";
import { Link } from "gatsby";

const CardDataList = (props) => {
  const { cards, readMoreLabel } = props;

  if (!cards.length) {
    return null;
  }

  return (
    <div>
      {cards.map((card) => (
        <div key={card.url}>
          <img src={card.thumbnail} alt={card.title} />
          <h3>
            <Link to={card.url}>{card.title}</Link>
          </h3>
          {card.meta && <p>{card.meta}</p>}
          <p>{card.description}</p>
          {card.tags?.length && (
            <div>
              {card.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <Link to={card.url}>{readMoreLabel}</Link>
        </div>
      ))}
    </div>
  );
};

CardDataList.defaultProps = {
  readMoreLabel: "Read more",
};

CardDataList.propTypes = {
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
  readMoreLabel: string,
};

export default CardDataList;
