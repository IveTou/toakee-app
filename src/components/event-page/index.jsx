import React from 'react';

import EventBox from '~/src/components/event-box';
import Header from '~/src/components/header';

const EventPage = () => (
  <div className="EventPage">
    <Header title="Meus eventos" />
    <div className="EventPage-content">
      <EventBox />
    </div>
  </div>
);

export default EventPage;
