import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { getToken } from '~/src/utils/session';

import Unlogged from '~/src/pages/unlogged';
import Landing from '~/src/components/landing';
import AuthWrapper from '~/src/components/auth-wrapper';
import Login from '~/src/components/login';
import SignUp from '~/src/components/sign-up';
import RecoverPassword from '~/src/components/recover-password';
import Event from '~/src/components/event';

import Logged from '~/src/pages/logged';
import EventPage from '~/src/components/event-page';
import EventGuestList from '~/src/components/event-guest-list';

const loggedRoutes = (
  <Route path="/" component={Logged}>
    <IndexRoute component={EventPage} />
    <Route path="/lista/:slug" component={EventGuestList} />
    <Route path="/redirect" onEnter={() => { window.location = '/'; }} />
  </Route>
);

const unloggedRoutes = (
  <Route path="/" component={Unlogged}>
    <IndexRoute component={Landing} />
    <Route path="/evento/:slug" component={Event} />
    <Route component={AuthWrapper}>
      <Route path="/login" component={Login} />
      <Route path="/cadastrar" component={SignUp} />
      <Route path="/recuperar-senha" component={RecoverPassword} />
    </Route>
    <Route path="/redirect" onEnter={() => { window.location = '/'; }} />
  </Route>
);

export default () => (getToken() ? loggedRoutes : unloggedRoutes);
