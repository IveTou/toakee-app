import React from 'react';

import EventBox from '~/src/components/event-box';
import Header from '~/src/components/header';

const EventFeed = () => (
  <div className="EventFeed">
    <Header title="Meus eventos" />
    <div className="EventFeed-content">
      <EventBox />
    </div>
  </div>
);

export default EventFeed;
