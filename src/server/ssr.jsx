import 'fetch-everywhere';
import 'ignore-styles';

import React from 'react';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  getDataFromTree,
} from 'react-apollo';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { pick } from 'lodash';
import moment from 'moment';

import '~/src/server/globals';
import rootReducer from '~/src/ducks';
import App from '~/src/app';

import config from './config';

moment.locale('pt-br');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

export const exposeSSRRoutes = (app, assets) => {
  app.get('*', (req, res) => {
    window.navigator = { userAgent: req.headers['user-agent'] };

    const { token } = req.cookies;
    const headers = token ? { authorization: `Bearer ${token}` } : {};
    localStorage.getItem = () => token;

    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: createNetworkInterface({
        uri: config.GRAPHQL_URI,
        opts: { headers },
      }),
    });

    const apolloApp = (
      <ApolloProvider client={client} store={reduxStore}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(apolloApp).then(() => {
      client.initStore();
      const content = ReactDOMServer.renderToStaticMarkup(apolloApp);
      const apolloContent = <div id="app" dangerouslySetInnerHTML={{ __html: content }} />;
      const initialState = pick(client.store.getState(), 'apollo.data');

      res.render('index.html', {
        assets,
        apolloContent: ReactDOMServer.renderToStaticMarkup(apolloContent),
        apolloState: JSON.stringify(initialState),
      });
    });
  });
};

