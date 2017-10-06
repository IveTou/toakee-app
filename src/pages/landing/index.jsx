import React from 'react';

import DefaultLayout from '~/src/layouts/default';
import BannerCarousel from '~/src/components/banner-carousel';
import EventBox from '~/src/components/event-box';
import MetaTags from 'react-meta-tags';

import { FACEBOOK_APP_ID, ASSETS_BASE_URI } from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Landing = () => (
  <DefaultLayout topbarTransparent>
    <MetaTags>
      <title>Toakee</title>
      <meta id="og-title" property="og:title" content="Toakee - O melhor Guia de eventos." />
      <meta
        id="og-description"
        name="og:description"
        content="Encontre o melhor evento da sua vida!" />
      <meta
        id="og-image"
        property="og:image"
        content=`${ASSETS_BASE_URI}/core/site/login-bg.jpg` />
      <meta id="og-url" property="og:url" content={location.href} />
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
