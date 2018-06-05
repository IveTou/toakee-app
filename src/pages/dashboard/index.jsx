import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import EventList from '~/src/components/event-list';

const Dashboard = () => (
  <div>
    <EventList
      title="Eventos futuros"
      start={moment().add(1, 'day').startOf('day')}
      vertical={false}
      strict
      counter
    />
  </div>
);

export default Dashboard;
