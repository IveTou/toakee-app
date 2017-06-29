import React from 'react';
import Slider from 'react-slick';

import banners from '~/src/banners';

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
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cellSpacin: 0,
  mobileFirst: true,
  nextArrow: <Arrow direction="right" />,
  prevArrow: <Arrow direction="left" />,
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
