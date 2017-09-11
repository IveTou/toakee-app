import React from 'react';
import moment from 'moment';

import EventList from '~/src/components/event-list';

import { homeCategories } from '~/src/constants';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var category;

const Landing = () => (
  <div className="Landing">
    <div className="Landing-lists">
      <EventList
        title="Próximos Eventos"
        start={moment().startOf('day')}
        end={moment().endOf('day')}
      />
      <EventList
        title="Nesta semana"
        start={moment().add(1, 'days').startOf('day')}
        end={moment().endOf('isoWeek')}
      />
      <For each="category" of={Object.keys(homeCategories)}>
        <EventList
          key={category}
          title={category}
          start={moment().startOf('day')}
          categoryIds={[homeCategories[category]]}
        />
      </For>
      <EventList
        title="Eventos futuros"
        start={moment().add(1, 'week').startOf('isoWeek')}
      />
    </div>
  </div>
);

export default Landing;
