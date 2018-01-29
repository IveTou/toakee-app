import React from 'react';

import DefaultLayout from '~/src/layouts/default';
import Banner from '~/src/components/banner';
import EventBox from '~/src/components/event-box';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Landing = () => (
  <DefaultLayout>
    <div className="Landing">
      <div className="Landing-banner">
        <Banner />
      </div>
      <div className="Landing-lists">
        <EventBox />
      </div>
    </div>
  </DefaultLayout>
);

export default Landing;
