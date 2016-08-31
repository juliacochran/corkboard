import React, { PropTypes } from 'react';

let dispatch;

function Col(data) {
  const keys = Object.keys(data);
  const len = keys.length;
  return (
    <span className="flex gray">
      <span className="gray mr1">{'{'}</span>
      <span>
        {keys.map((key, i) => (
          <span className="flex" key={i}>
            {dispatch(key)}
            {': '}
            {dispatch(data[key])}
            {i < (len - 1) ? <span className="self-end">,</span> : null}
          </span>
        ))}
      </span>
      <span className="self-end gray ml1">{'}'}</span>
    </span>
  );
}


function Arr(data) {
  const len = data.length;
  return (
    <span className="flex gray">
      <span className="gray mr1">{'['}</span>
      <span>
        {data.map((n, i) => (
          <span className="flex" key={i}>
            {dispatch(n)}
            {i < (len - 1) ? <span className="self-end">,</span> : null}
          </span>
        ))}
      </span>
      <span className="self-end gray ml1">{']'}</span>
    </span>
  );
}

function Str(data) {
  return (
    <span className="olive">{JSON.stringify(data)}</span>
  );
}

function Data(data) {
  return (
    <span className="black">{data.toString()}</span>
  );
}

dispatch = (data) => {
  if (Array.isArray(data)) {
    return <Arr {...data} />;
  }
  switch (typeof data) {
    case 'object':
      return <Col {...data} />;
    case 'string':
      return <Str {...data} />;
    default:
      return <Data {...data} />;
  }
};

export default function JsonData(props) {
  const { data } = props;
  return (
    <pre className="p1" style={{ whiteSpace: 'pre', overflow: 'auto' }}>
      {dispatch(data)}
    </pre>
  );
}

JsonData.propTypes = {
  data: PropTypes.any.isRequired,
};
