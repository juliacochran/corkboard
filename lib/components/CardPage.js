import React, { PropTypes } from 'react';

export default function CardPage(props) {
  const { menu, nsToMenuMap: map, params: { ns } } = props;

  if (Object.keys(menu).length === 0 || !ns) {
    return <div />;
  }

  const menuTitle = map[ns];
  const cards = menu[menuTitle].children[ns];

  return (
    cards ? <div className="p2">
      {cards.map((card, i) =>
        <div className="mb4" id={`card-${i}`} key={i}>{card.fn()}</div>
       )}
    </div>
    : <div div className="p2">
      <h1 className="mt0 mb6 display-l dark-gray">Oops!<br />This page could not be found.</h1>
    </div>
  );
}

CardPage.propTypes = {
  menu: PropTypes.any.isRequired,
  nsToMenuMap: PropTypes.any,
  params: PropTypes.shape({
    ns: PropTypes.string,
  }).isRequired,
};
