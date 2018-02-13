import React from 'react';

import DefaultLayout from '~/src/layouts/default';
import EventBox from '~/src/components/event-box';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventFeed = () => (
  <DefaultLayout>
    <div className="EventFeed">
      <div className="EventFeed-content">
        <EventBox />
      </div>
    </div>
  </DefaultLayout>
);

export default EventFeed;
