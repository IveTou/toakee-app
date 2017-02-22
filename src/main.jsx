import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';
import useRelay from 'react-router-relay';
import {
  Router,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';

import { GRAPHQL_URI } from '~/src/server/config';
import { getToken } from '~/src/utils/session';
import makeRoutes from '~/src/routes';

if (process.env.BROWSER) {
  require('~/node_modules/material-design-lite/material.min.css');
  require('~/node_modules/material-design-lite/material.min.js');
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(GRAPHQL_URI, {
    headers: {
      credentials: 'include',
      Authorization: getToken() ? `Bearer ${getToken()}` : '',
    },
  }),
);

const router = (
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
    routes={makeRoutes()}
  />
);

render(router, document.getElementById('app'));
