import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import { Router, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '~/src/ducks';

import config from '~/src/config';
import { getToken } from '~/src/utils/session';
import makeRoutes from '~/src/routes';

if (process.env.BROWSER) {
  require('~/src/scss/base.scss');
  require('slick-carousel/slick/slick.css');
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

const apolloClient = new ApolloClient({ networkInterface });

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

const app = (
  <ApolloProvider store={reduxStore} client={apolloClient}>
    <Router
      onUpdate={() => window.scrollTo(0, 0)}
      history={browserHistory}
      routes={makeRoutes()}
    />
  </ApolloProvider>
);

render(app, document.getElementById('app'));
