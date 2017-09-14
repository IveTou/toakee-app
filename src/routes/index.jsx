import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { getToken } from '~/src/utils/session';

import Unlogged from '~/src/pages/unlogged';
import AuthWrapper from '~/src/components/auth-wrapper';
import Login from '~/src/components/auth-wrapper/login';
import SignUp from '~/src/components/auth-wrapper/sign-up';

import Logged from '~/src/pages/logged';
import Landing from '~/src/components/landing';
import About from '~/src/components/about';
import EventFeed from '~/src/components/event-feed';
import NewEventPage from '~/src/components/new-event-page';
import EventGuestList from '~/src/components/event-guest-list';
import EventGuestListEdit from '~/src/components/event-guest-list-edit';
import Dashboard from '~/src/components/dashboard';
import DashboardRoot from '~/src/components/dashboard/root';
import SearchPage from '~/src/components/search-page';

import EventPage from '~/src/components/event-page/new';
import EventPhotos from '~/src/components/event-photos';

const loggedRoutes = (
  <Route path="/" component={Logged}>
    <IndexRoute component={EventFeed} />
    <Route path="/search" component={SearchPage} />
    <Route path="/dashboard" component={Dashboard}>
      <IndexRoute component={DashboardRoot} />
      <Route path="/dashboard/:slug/lista" component={EventGuestList} />
      <Route path="/dashboard/:slug/editar-listas" component={EventGuestListEdit} />
    </Route>
    <Route path="/quem-somos" component={About} />
    <Route path="/evento/novo" component={NewEventPage} />
    <Route path="/evento/:slug" component={EventPage} />
    <Route path="/evento/:slug/fotos" component={EventPhotos} />
    <Route path="/redirect" onEnter={() => { window.location = '/'; }} />
  </Route>
);

const unloggedRoutes = (
  <Route path="/" component={Unlogged}>
    <IndexRoute component={Landing} />
    <Route path="/search" component={SearchPage} />
    <Route path="/quem-somos" component={About} />
    <Route path="/evento/:slug" component={EventPage} />
    <Route path="/evento/:slug/fotos" component={EventPhotos} />
    <Route component={AuthWrapper}>
      <Route path="/login" component={Login} />
      <Route path="/cadastrar" component={SignUp} />
    </Route>
    <Route path="/redirect" onEnter={() => { window.location = '/'; }} />
  </Route>
);

export default () => (getToken() ? loggedRoutes : unloggedRoutes);
