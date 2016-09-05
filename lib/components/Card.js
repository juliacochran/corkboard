import React, { PropTypes } from 'react';
import cs from 'classnames';
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

  return (
    <div>
      {options.heading ? <h2 className="display-s dark-gray mt0 py2 mb2 border-bottom">{name}</h2> : null}
      <div className={cs('mxn2 py2', { 'md-flex': !options.stretch })}>
        <div className={cs('px2 border-box', { 'sm-col-6 md-col-4': !options.stretch })}>
          {documentation ? <Documentation text={documentation.text} /> : null}
        </div>
        <div className={cs('px2 border-box', { 'sm-col-6 md-col-8': !options.stretch })}>{example}</div>
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
    stretch: PropTypes.bool,
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
    stretch: false,
  },
};
