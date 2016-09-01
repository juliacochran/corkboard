/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';

let CURRENT_NAMESPACE;
const CARDS = [];

export function registerNamespace(namespace) {
  CURRENT_NAMESPACE = namespace;
  CARDS[CURRENT_NAMESPACE] = [];
}

export function registerCard(card) {
  if (!CURRENT_NAMESPACE) {
    throw new Error('No namespace defined');
  }
  CARDS[CURRENT_NAMESPACE].push({
    ns: CURRENT_NAMESPACE,
    fn: () => card,
  });
}

export function getCards() {
  return CARDS;
}
