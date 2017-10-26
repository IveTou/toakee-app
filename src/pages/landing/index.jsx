import React from 'react';
import MetaTags from 'react-meta-tags';

import DefaultLayout from '~/src/layouts/default';
import BannerCarousel from '~/src/components/banner-carousel';
import EventBox from '~/src/components/event-box';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Landing = () => (
  <DefaultLayout topbarTransparent>
    <MetaTags>
      <title>Toakee - Descubra o que fazer em Salvador</title>
    </MetaTags>
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
