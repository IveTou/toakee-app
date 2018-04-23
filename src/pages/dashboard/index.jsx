import React from 'react';
import { Route } from 'react-router-dom';

import DashboardMenu from './menu';
import DashboardContent from './content';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Dashboard = () => (
  <div className="Dashboard">
    <Route path="/dashboard/:id?" component={DashboardMenu} />
    <DashboardContent />
  </div>
);

export default Dashboard;
