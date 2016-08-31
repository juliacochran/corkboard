import React from 'react';
import Card from './components/Card';

const DEFAULT_NAME = Symbol('card');

function defaultName(exprs, dname) {
  const [first, ...rest] = exprs;
  if (typeof first === 'string') {
    return [first, rest];
  }
  return [dname, rest];
}

function defaultDocumentation(exprs) {
  const [first, ...rest] = exprs;
  if (first.isDoc) {
    return [first, rest];
  }
  return [null, rest];
}

function parseArgs(args, dname) {
  const [
    ns,
    exprs1,
  ] = defaultName(args, dname);
  const [
    documentation,
    exprs2,
  ] = defaultDocumentation(exprs1);
  return [ns, documentation, ...exprs2];
}

function parseCardArgs(args, dname) {
  const results = parseArgs(args, dname);
  const [
    ns,
    documentation,
    body,
    initialData,
  ] = results;
  let options = results[4];

  options = {
    ...Card.defaultProps.options,
    ...options,
  };

  if (ns === dname) {
    options = {
      ...options,
      heading: false,
    };
  }
  return [ns, documentation, body, initialData, options];
}

export default function defcard(...args) {
  const [
        ns, documentation, body, initialData, options,
    ] = parseCardArgs(args, DEFAULT_NAME);

  return (
    <Card
      body={body}
      documentation={documentation}
      initialData={initialData}
      name={ns}
      options={options}
    />
  );
}
