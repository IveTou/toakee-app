import React from 'react';

import DefaultLayout from '~/src/layouts/default';
import BannerCarousel from '~/src/components/banner-carousel';
import EventBox from '~/src/components/event-box';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Landing = () => (
  <DefaultLayout topbarTransparent>
    <div className="Landing">
      <div className="Landing-banner">
        <BannerCarousel />
      </div>
      <div className="Landing-lists">
        <EventBox />
      </div>
    </div>
  </DefaultLayout>
);

export default Landing;
