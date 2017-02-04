import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute } from 'react-router';

import { getToken } from '~/src/utils/session';

import Unlogged from '~/src/pages/unlogged';
import Landing from '~/src/components/landing';
import Login from '~/src/components/login';
import SignUp from '~/src/components/sign-up';
import Event from '~/src/components/event';

import Logged from '~/src/pages/logged';
import Home from '~/src/components/home';

const viewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const loggedRoutes = (
  <Route path="/" component={Logged}>
    <IndexRoute component={Home} queries={viewerQueries} />
    <Route path="/evento/:slug" component={Event} />
  </Route>
);

const unloggedRoutes = (
  <Route path="/" component={Unlogged}>
    <IndexRoute component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/redirect" onEnter={() => { window.location = '/'; }} />
  </Route>
);

export default () => (getToken() ? loggedRoutes : unloggedRoutes);
