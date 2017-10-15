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
import moment from 'moment-timezone';

import '~/src/server/globals';
import rootReducer from '~/src/ducks';
import App from '~/src/app';

import config from './config';

moment.locale('pt-br');
moment.tz.setDefault('America/Bahia');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

export const exposeSSRRoutes = (app, assets) => {
  app.get('*', (req, res) => {
    const { token } = req.cookies;
    const headers = token ? { authorization: `Bearer ${token}` } : {};

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
          <App userAgent={req.headers['user-agent']} />
        </StaticRouter>
      </ApolloProvider>
    );

    function getPropertyByRegex(obj, patt) {
      let result;
      Object.keys(obj).forEach((key) => {
        if (patt.test(key)) {
          result = key;
        }
      });
      return result;
    }

    getDataFromTree(apolloApp).then(() => {
      client.initStore();
      const content = ReactDOMServer.renderToStaticMarkup(apolloApp);
      const apolloContent = <div id="app" dangerouslySetInnerHTML={{ __html: content }} />;
      const initialState = pick(client.store.getState(), 'apollo.data');

      const eventObject = initialState.apollo.data;
      const eventProps = getPropertyByRegex(eventObject, /^Event:[a-z0-9]+[^.]+[a-z0-9]+$/);
      const ogMetaTags = req.url.match(/\/evento\/.+/g) ?
      {
        title: eventObject[eventProps].title,
        description: eventObject[eventProps].description,
        image: eventObject[eventProps].flyer,
        url: `${req.headers.host}${req.url}`,
        app_id: config.FACEBOOK_APP_ID,
      }
      :
      {
        title: 'Toakee',
        description: 'O melhor guia de eventos.',
        image: `${config.ASSETS_BASE_URI}/core/site/login-bg.jpg`,
        url: 'www.toakee.com.br',
        app_id: config.FACEBOOK_APP_ID,
      }
      ;

      res.render('index.html', {
        assets,
        apolloContent: ReactDOMServer.renderToStaticMarkup(apolloContent),
        apolloState: JSON.stringify(initialState),
        ogMetaTags,
      });
    });
  });
};

