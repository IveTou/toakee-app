import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Router, browserHistory } from 'react-router';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import config from '~/src/config';
import makeRoutes from '~/src/routes';
import rootReducer from '~/src/toakee-core/ducks';

import StoreProvider from '~/src/components/store-provider';

if (process.env.BROWSER) {
  require('~/src/scss/base.scss');
  require('~/node_modules/include-media/dist/_include-media.scss');
  require('~/node_modules/material-design-lite/material.min.js');
  require('~/node_modules/slick-carousel/slick/slick.css');
}

moment.locale('pt-br');

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: config.GRAPHQL_URI,
  }),
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

const app = (
  <ApolloProvider store={reduxStore} client={apolloClient}>
    <StoreProvider>
      <Router history={browserHistory} routes={makeRoutes()} />
    </StoreProvider>
  </ApolloProvider>
);

render(app, document.getElementById('app'));
