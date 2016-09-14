import { registerCard, registerNamespace } from './init';
import defcard from './lib/defcard';
import React from 'react';
import Markdown from './lib/components/Markdown';

export {
  registerNamespace as ns,
  registerCard,
};

export function card(...args) {
  registerCard((id) => defcard(id, ...args));
}

export function md(str) {
  return <Markdown text={typeof str === 'string' ? str : str.join('\n')} />;
}

export function doc(str) {
  console.log('`doc` is deprecated. Please use `md` instead');
  return md(str);
}

export function text(documentation) {
  card(null, md([documentation]), null, {}, { heading: false });
}
