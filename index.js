import { registerCard, registerNamespace, run } from './init';

export function doc(str) {
  return {
    isDoc: true,
    text: str.join('\n'),
  };
}

export {
  registerCard as card,
  registerNamespace as ns,
  run,
};
