import React from 'react';

import { banners } from '~/src/constants';

import BannerImage from './banner-image';

if (process.env.BROWSER) {
  require('./style.scss');
}

const BannerCarousel = () => (
  <div className="BannerCarousel">
    <BannerImage {...banners[Math.floor(Math.random() * (banners.length))]} />
  </div>
);

export default BannerCarousel;
