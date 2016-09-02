import { registerCard, registerNamespace } from './init';
import defcard from './lib/defcard';

export {
  registerNamespace as ns,
  registerCard,
};

export function card(...args) {
  registerCard(defcard(...args));
}

export function md(str) {
  return {
    isDoc: true,
    text: str.join('\n'),
  };
}

export function doc(str) {
  console.log('`doc` is deprecated. Please use `md` instead');
  return md(str);
}

export function text(documentation) {
  card(null, md([documentation]), null, {}, { heading: false });
}
