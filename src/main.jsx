import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { createBrowserHistory } from 'history';

import { Router } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '~/src/ducks';

import config from '~/src/config';
import { getToken } from '~/src/utils/session';

import App from './app';

if (process.env.BROWSER) {
  require('~/src/scss/base.scss');
  require('react-rte/lib/RichTextEditor.css');
}

moment.locale('pt-br');

const networkInterface = createNetworkInterface({ uri: config.GRAPHQL_URI });

networkInterface.use([{
  applyMiddleware: (req, next) => {
    if (getToken()) {
      const authorization = `Bearer ${getToken()}`;
      req.options.headers = Object.assign(req.options.headers || {}, { authorization });
    }
    next();
  },
}]);

const apolloClient = new ApolloClient({
  initialState: window.__APOLLO_STATE__,
  networkInterface,
  shouldBatch: true,
});

window.ac = apolloClient;

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

const app = (
  <ApolloProvider store={reduxStore} client={apolloClient}>
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </ApolloProvider>
);

render(app, document.getElementById('app'));
