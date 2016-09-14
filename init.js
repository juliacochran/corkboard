/* eslint-env browser */
let CURRENT_NAMESPACE;
const CARDS = [];

export function registerNamespace(namespace) {
  CURRENT_NAMESPACE = namespace;
  CARDS[CURRENT_NAMESPACE] = [];
}

export function registerCard(cardOrFunction) {
  if (!CURRENT_NAMESPACE) {
    throw new Error('No namespace defined');
  }

  let card = cardOrFunction;
  const nsId = CURRENT_NAMESPACE.replace(/\W/g, '-').toLowerCase();
  const id = `${nsId}-${CARDS[CURRENT_NAMESPACE].length}`;

  if (typeof cardOrFunction === 'function') {
    card = cardOrFunction(id);
  }

  CARDS[CURRENT_NAMESPACE].push({
    id,
    ns: CURRENT_NAMESPACE,
    fn: () => card,
  });
}

export function getCards() {
  return CARDS;
}
