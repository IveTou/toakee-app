import React from 'react';
import moment from 'moment';

import EventList from '~/src/components/event-list';

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
      end={moment().endOf('week')}
    />
    <EventList
      title="Eventos futuros"
      start={moment().add(1, 'week').startOf('week')}
    />
  </div>
);

export default EventBox;
