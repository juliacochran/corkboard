import React, { PropTypes } from 'react';
import Documentation from './Markdown';
import StateRecorder from './StateRecorder';

export default function Card(props) {
  const {
    name,
    documentation,
    body,
    initialData,
    options,
  } = props;

  let example = body;

  if (typeof body === 'function') {
    example = (
      <StateRecorder
        fn={body}
        historyLimit={100}
        initialState={initialData}
        showHistory={options.history}
        showState={options.inspectData}
      />
    );
  }

  if (options.padding) {
    example = <div className="p1">{example}</div>;
  }

  return (
    <div className="p3">
      {options.heading ? <h2 className="mt0 mb3 px3" style={{ width: '20rem' }}>{name}</h2> : null}
      <div style={{ display: 'flex' }}>
        <div className="px3 border-box" style={{ minWidth: '20rem', width: '30rem' }}>
          {documentation ? <Documentation text={documentation.text} /> : null}
        </div>
        <div className="px3 border-box" style={{ flex: '1 1 auto' }}>{example}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  body: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  documentation: PropTypes.shape({
    isDoc: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  initialData: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({
    heading: PropTypes.bool,
    inspectData: PropTypes.bool,
    watchAtom: PropTypes.bool,
    history: PropTypes.bool,
  }).isRequired,
};

Card.defaultProps = {
  body: null,
  initialData: {},
  options: {
    frame: true,
    heading: true,
    padding: true,
    hidden: false,
    inspectData: false,
    watchAtom: true,
    history: false,
  },
};
