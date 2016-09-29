/* eslint-env browser */

const MENU = [];
let currentNamespace = null;
let currentType = null;
let currentMenuTitle;
const NS_TO_MENU_MAP = []; /* Keeps a basic mapping of namespace to menu title for easy retrieval */

function menuItem(type, children = []) {
  return ({
    type,
    children,
  });
}

export function registerGroup(groupName, renderPages) {
  currentMenuTitle = groupName;
  currentType = 'group';
  MENU[currentMenuTitle] = menuItem(currentType);
  renderPages();
  currentType = null;
}

export function registerNamespace(ns) {
  // namespace already exists
  if (currentType === 'group' && ns in MENU) {
    throw new Error('You must have unqiue group names and namespaces');
  }

  // page without a group
  if (!currentType) {
    currentMenuTitle = ns;
    currentType = 'page';
    MENU[currentMenuTitle] = menuItem(currentType);
  }
  currentNamespace = ns;
  MENU[currentMenuTitle].children[currentNamespace] = [];

  NS_TO_MENU_MAP[currentNamespace] = currentMenuTitle;
}

export function registerCard(cardOrFunction) {
  if (!currentMenuTitle) {
    throw new Error('No namespace or group defined');
  }

  let card = cardOrFunction;
  const nsId = currentNamespace.replace(/\W/g, '-').toLowerCase();
  const id = `${nsId}-${MENU[currentMenuTitle].children[currentNamespace].length}`;

  if (typeof cardOrFunction === 'function') {
    card = cardOrFunction(id);
  }

  MENU[currentMenuTitle].children[currentNamespace].push({
    id,
    ns: currentNamespace,
    fn: () => card,
  });
}

export function getCards() {
  return MENU;
}

export function getNsToMenuMap() {
  return NS_TO_MENU_MAP;
}
