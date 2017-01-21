import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { getToken } from '~/src/utils/session';

import Unlogged from '~/src/pages/unlogged';
import Landing from '~/src/components/landing';
import Login from '~/src/components/login';
import SignUp from '~/src/components/sign-up';

const loggedRoutes = null;

const unloggedRoutes = (
  <Route path="/" component={Unlogged}>
    <IndexRoute component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/redirect" onEnter={() => { window.location = '/'; }} />
  </Route>
);

export default () => (getToken() ? loggedRoutes : unloggedRoutes);
