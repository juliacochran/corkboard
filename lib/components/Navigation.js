import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Navigation(props) {
  const { cards } = props;
  const links = Object.keys(cards).map((ns, i) =>
    <Link to={`/${ns}`} className="h5 px1 block black blue-hover" key={i}>{ns}</Link>
  );

  return (
    <div className="py1">
      {links}
    </div>
  );
}

Navigation.propTypes = {
  cards: PropTypes.any,
};
