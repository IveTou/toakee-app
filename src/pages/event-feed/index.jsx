import React from 'react';

import EventBox from '~/src/components/event-box';
import Banner from '~/src/components/banner';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventFeed = () => (
  <div className="EventFeed">
    <div className="EventFeed-banner">
      <Banner />
    </div>
    <div className="EventFeed-lists">
      <EventBox />
    </div>
  </div>
);

export default EventFeed;
