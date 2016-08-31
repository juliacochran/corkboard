/* eslint-env browser */
import React from 'react';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import App from './lib/components/App';
import CardPage from './lib/components/CardPage';
import defcard from './lib/defcard';

let CURRENT_NAMESPACE;
const CARDS = [];

export function registerNamespace(namespace) {
  CURRENT_NAMESPACE = namespace;
  CARDS[CURRENT_NAMESPACE] = [];
}

export function registerCard(ns, ...args) {
  if (!CURRENT_NAMESPACE) {
    throw new Error('No namespace defined');
  }
  CARDS[CURRENT_NAMESPACE].push({
    ns: CURRENT_NAMESPACE,
    fn: () => defcard(ns, ...args),
  });
}

const connect = (Component, state) => (props) => (
  <Component {...state} {...props} />
);

export function run(cards = CARDS) {
  const ConnectedApp = connect(App, { cards });
  const ConnectedCardPage = connect(CardPage, { cards });

  const routes = (
    <Route component={ConnectedApp} path="/">
      <IndexRoute component={ConnectedCardPage} />
      <Route
        component={ConnectedCardPage}
        path="/:ns"
      />
    </Route>
  );

  const node = document.createElement('DIV');
  document.body.appendChild(node);

  render(
    <Router history={hashHistory}>{routes}</Router>,
    node
  );
}
