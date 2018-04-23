import 'fetch-everywhere';
import 'ignore-styles';

import React from 'react';
import { MuiThemeProvider } from 'material-ui';
import ApolloClient from 'apollo-client';
import {
  ApolloProvider,
  getDataFromTree,
} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router';
import { JssProvider, SheetsRegistry } from 'react-jss'
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { pick } from 'lodash';
import moment from 'moment-timezone';
import htmlToText from 'html-to-text';

import '~/src/server/globals';
import rootReducer from '~/src/ducks';
import App from '~/src/app';
import { theme } from '~/src/mui/theme';

import config from './config';

moment.locale('pt-br');
moment.tz.setDefault('America/Bahia');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

const getMetaTags = (obj, url) => {
  const appId = config.FACEBOOK_APP_ID;
  const eventKey = `Event:${url.match(/\w+$/g)}`;
  const htmlOptions = { wordwrap: false, ignoreHref: true, ignoreImage: true };
  const { title, description, flyer: image } = obj[eventKey] || {};

  return /^.+\/evento\/.+$/.test(url)
    ? { title, description: htmlToText.fromString(description, htmlOptions), image, appId, url }
    : {
      title: 'Descubra o que fazer em Salvador',
      description: 'Descubra o que fazer em Salvador. No seu guia de eventos você encontra baladas, teatro, festas, shows, restaurantes, exposições, esportes, seminários, workshops, cursos, promoções, corridas, tudo que acontece na cidade em um só lugar.',
      image: `${config.ASSETS_BASE_URI}/core/site/brand.png`,
      url: 'www.toakee.com.br',
      appId,
    };
};


export const exposeSSRRoutes = (app, assets) => {
  app.get('*', (req, res) => {
    const { token } = req.cookies;
    const headers = token ? { authorization: `Bearer ${token}` } : {};

    const link = new ApolloLink((operation, forward) => {
      operation.setContext({ headers });
      return forward(operation);
    }).concat(createHttpLink({ uri: config.GRAPHQL_URI }));

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      ssrMode: true,
      link,
    });
    const sheets = new SheetsRegistry();

    const apolloApp = (
      <ApolloProvider client={client} store={reduxStore}>
        <Provider store={reduxStore}>
          <StaticRouter location={req.url} context={{}}>
            <JssProvider registry={sheets}>
              <MuiThemeProvider theme={theme}>
                <App userAgent={req.headers['user-agent']} />
              </MuiThemeProvider>
            </JssProvider>
          </StaticRouter>
        </Provider>
      </ApolloProvider>
    );

    getDataFromTree(apolloApp).then(() => {
      const content = ReactDOMServer.renderToStaticMarkup(apolloApp);
      const apolloContent = <div id="app" dangerouslySetInnerHTML={{ __html: content }} />;
      const initialState = client.cache.extract();
      const ogMetaTags = getMetaTags(initialState, `${req.headers.host}${req.url}`);

      res.render('index.html', {
        assets,
        apolloContent: ReactDOMServer.renderToStaticMarkup(apolloContent),
        apolloState: JSON.stringify(initialState),
        jssSheets: sheets.toString(),
        ogMetaTags,
      });
    });
  });
};
