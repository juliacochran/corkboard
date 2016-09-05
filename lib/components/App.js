import React, { PropTypes } from 'react';
import 'pinterest-gestalt/styles.css';
import Navigation from './Navigation';
import '../styles.css';

export default function App(props) {
  const { cards, children } = props;
  return (
    <div className="flex sans-serif" style={{ minHeight: '100vh' }}>
      <div className="md-col-2 border-box">
        <Navigation cards={cards} />
      </div>
      <div className="md-col-10 border-box">
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  cards: PropTypes.any.isRequired,
  children: PropTypes.node,
  params: PropTypes.shape({
    ns: PropTypes.string,
  }).isRequired,
};
