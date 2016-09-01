import React, { PropTypes } from 'react';
import Navigation from './Navigation';
import '../styles.css';

export default function App(props) {
  const { cards, children } = props;
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ borderRight: '1px solid #EFEFEF', minWidth: '10rem' }}>
        <Navigation cards={cards} />
      </div>
      <div style={{ flex: '1 1 auto', backgroundColor: '#FAFAFA' }}>
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
