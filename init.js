/* eslint-env browser */

const MENU = [];
const NS_TO_MENU_MAP = []; /* Keeps a basic mapping of namespace to menu title for easy retrieval */

let currentMenuTitle;
let currentNamespace;
let currentlyInGroup = false;

function createMenuItem() {
  return {
    inGroup: currentlyInGroup,
    children: [],
  };
}

export function registerGroup(groupName, renderPages) {
  currentlyInGroup = true;
  currentMenuTitle = groupName;
  MENU[currentMenuTitle] = createMenuItem();
  renderPages();
  currentlyInGroup = false;
}

export function registerNamespace(ns) {
  // namespace already exists
  if (currentlyInGroup && ns in MENU) {
    console.warn(`You already have group named ${ns}! You should name this page something unique.`);
  }

  // page without a group
  if (!currentlyInGroup) {
    currentMenuTitle = ns;
    MENU[currentMenuTitle] = createMenuItem();
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

export function getMenu() {
  return MENU;
}

export function getNsToMenuMap() {
  return NS_TO_MENU_MAP;
}
