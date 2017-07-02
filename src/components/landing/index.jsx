import React from 'react';
import moment from 'moment';

import BannerCarousel from '~/src/components/banner-carousel';
import EventList from '~/src/components/event-list';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Landing = () => (
  <div className="Landing">
    <div className="Landing-banner">
      <BannerCarousel />
    </div>
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
      <EventList
        title="Eventos futuros"
        start={moment().add(1, 'week').startOf('isoWeek')}
      />
    </div>
  </div>
);

export default Landing;
