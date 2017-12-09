import React from 'react';
import moment from 'moment';

import DefaultLayout from '~/src/layouts/default';
import EventList from '~/src/components/event-list';
import Header from '~/src/components/header';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventModeration = () => (
  <DefaultLayout>
    <div className="EventModeration">
      <Header title="Moderar eventos" />
      <div className="EventModeration-content">
        <EventList
          title="Pendentes"
          status="PENDING"
          start={moment().startOf('hour')}
          forceFetch
        />
      </div>
    </div>
  </DefaultLayout>
);

export default EventModeration;
