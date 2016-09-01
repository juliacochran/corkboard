import React from 'react';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './lib/components/App';
import CardPage from './lib/components/CardPage';
import { render } from 'react-dom';
import { getCards } from './init';

const connect = (state, Component) => (props) => (
  <Component {...state} {...props} />
);

const cards = getCards();

const ConnectedApp = connect({ cards }, App);
const ConnectedCardPage = connect({ cards }, CardPage);

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
