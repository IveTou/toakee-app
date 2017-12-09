import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';

import DefaultLayout from '~/src/layouts/default';

import DashboardMenu from './menu';
import DashboardContent from './content';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Dashboard = () => (
  <DefaultLayout hideFooter>
    <div className="Dashboard">
      <Route path="/dashboard/:id?" component={DashboardMenu} />
      <DashboardContent />
    </div>
  </DefaultLayout>
);

Dashboard.propTypes = {
  match: PropTypes.object,
};

export default Dashboard;
