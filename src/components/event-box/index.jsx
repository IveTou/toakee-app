import React from 'react';
import moment from 'moment';

import EventList from '~/src/components/event-list';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventBox = () => (
  <div className="EventBox">
    <EventList
      title="Hoje"
      start={moment().startOf('day')}
      end={moment().endOf('day')}
    />
    <EventList
      title="Nesta semana"
      start={moment().add(1, 'days').startOf('day')}
      end={moment().endOf('isoWeek')}
    />
    <EventList
      title="Eventos futuros"
      start={moment().add(1, 'week').startOf('isoWeek')}
    />
  </div>
);

export default EventBox;
