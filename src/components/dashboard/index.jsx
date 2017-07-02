import React, { PropTypes } from 'react';

import DashboardMenu from './menu';
import DashboardContent from './content';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Dashboard = ({ children, router: { params: { slug } } }) => (
  <div className="Dashboard">
    <DashboardMenu selectedEventSlug={slug} />
    <DashboardContent selectedEventSlug={slug} content={children} />
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.any,
  router: PropTypes.object,
};

export default Dashboard;
