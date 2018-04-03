import React from 'react';
import moment from 'moment';

import EventList from '~/src/components/event-list';

import { homeCategories } from '~/src/constants';

declare var category;

const EventBox = () => (
  <div className="EventBox">
    <EventList
      title="Próximos Eventos"
      start={moment().startOf('hour')}
      end={moment().endOf('day')}
      forceFetch
    />
    <EventList
      title="Nesta semana"
      start={moment().add(1, 'days').startOf('day')}
      end={moment().endOf('isoWeek')}
      strict
      forceFetch
    />
    <EventList
      title="Eventos com fotos"
      has="photos"
      sort={{ start: -1, slug: 1 }}
      forceFetch
    />
    <For each="category" of={Object.keys(homeCategories)}>
      <EventList
        key={category}
        title={category}
        start={moment().startOf('hour')}
        categoryIds={[homeCategories[category]]}
      />
    </For>
    <EventList
      title="Eventos futuros"
      start={moment().add(1, 'week').startOf('isoWeek')}
      strict
    />
  </div>
);

export default EventBox;
