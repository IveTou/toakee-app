import React from 'react';
import Slider from 'react-slick';

import { banners } from '~/src/constants';

import Arrow from './arrow';
import BannerImage from './banner-image';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var banner;

const settings = {
  dots: true,
  dotsClass: 'custom-dots',
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cellSpacin: 0,
  mobileFirst: true,
  nextArrow: <Arrow direction="right" aria-label="próximo banner" />,
  prevArrow: <Arrow direction="left" aria-label="banner anterior" />,
};

const BannerCarousel = () => (
  <div className="BannerCarousel">
    <Slider {...settings}>
      <For each="banner" of={banners}>
        <BannerImage key={banner.img} {...banner} />
      </For>
    </Slider>
  </div>
);

export default BannerCarousel;
