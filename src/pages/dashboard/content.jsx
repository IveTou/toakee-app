import React from 'react';
import { Route } from 'react-router-dom';

import EventGuestList from '~/src/components/event-guest-list';
import EventGuestListEdit from '~/src/components/event-guest-list-edit';

import DashboardRoot from './root';

const DashboardContent = () => (
  <div className="DashboardContent">
    <Route path="/dashboard" exact component={DashboardRoot} />
    <Route path="/dashboard/:slug/lista" component={EventGuestList} />
    <Route path="/dashboard/:slug/editar-listas" component={EventGuestListEdit} />
  </div>
);

export default DashboardContent;
