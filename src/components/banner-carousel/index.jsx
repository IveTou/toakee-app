import React, { PropTypes } from 'react';

import Slider from 'react-slick';
import { Button } from 'semantic-ui-react';

import banners from '~/src/banners';

if (process.env.BROWSER) {
  require('./style.scss');
}

const BannerImage = (img, url, index) => {
  const style = {
    backgroundImage: `url(${img})`,
  };

  return (
    <a href={url}>
      <div className="BannerImage" key={index} style={style} />
    </a>
  );
};

const Arrow = ({ className, onClick, direction }) => (
  <Button
    circular
    className={className}
    icon={`chevron ${direction}`}
    onClick={onClick}
  />
);

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
      {banners.map((banner, index) => BannerImage(banner.img, banner.url, index))}
    </Slider>
  </div>
);

Arrow.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
};

export default BannerCarousel;
