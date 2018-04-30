import React from 'react';
import moment from 'moment';

import EventList from '~/src/components/event-list';
import Header from '~/src/components/header';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventModeration = () => (
  <div className="EventModeration">
    <Header title="Moderar eventos" />
    <div className="EventModeration-content">
      <EventList
        title="Pendentes"
        status="PENDING"
        start={moment().startOf('hour')}
        forceFetch
        counter
      />
    </div>
  </div>
);

export default EventModeration;
