import React, { PropTypes } from 'react';

export default function CardPage(props) {
  const { params: { ns } } = props;
  const cards = props.cards[ns];
  return (
    <div>
      {cards.map((card, i) =>
        <div id={`card-${i}`} key={i}>{card.fn()}</div>
       )}
    </div>
  );
}

CardPage.propTypes = {
  cards: PropTypes.any.isRequired,
  params: PropTypes.shape({
    ns: PropTypes.string.isRequired,
  }).isRequired,
};
