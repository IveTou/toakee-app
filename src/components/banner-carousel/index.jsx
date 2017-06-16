import React from 'react';

import Slider from 'react-slick';

/*
if (process.env.BROWSER) {
  require('./style.scss');
}
*/

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cellSpacin: 0,
  cellAlign: 'center',
};

const url = [
  'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1', 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide2',
  'http://placehold.it/1000x400/ffffff/c0392b/&text=slide3','http://placehold.it/1000x400/ffffff/c0392b/&text=slide4',
  'http://placehold.it/1000x400/ffffff/c0392b/&text=slide5','http://placehold.it/1000x400/ffffff/c0392b/&text=slide6',
]

const BannerCarousel = () => (
  <Slider {...settings}>
    <div>
      {url.map(url => <img src={url} />)}
    </div>
  </Slider>
);

export default BannerCarousel;
