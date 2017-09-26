import React from 'react';

import DefaultLayout from '~/src/layouts/default';
import EventBox from '~/src/components/event-box';
import Header from '~/src/components/header';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventFeed = () => (
  <DefaultLayout>
    <div className="EventFeed">
      <Header title="Eventos" />
      <div className="EventFeed-content">
        <EventBox />
      </div>
    </div>
  </DefaultLayout>
);

export default EventFeed;
