import React from 'react';

import Slider from 'react-slick';
import { Button } from 'semantic-ui-react'

if (process.env.BROWSER) {
  require('./style.scss');
}


const images = [
  'https://res.cloudinary.com/toakeeassets/image/upload/s--e0tcSGpi--/v1497419551/events/592ccf20140f0.jpg',
  'https://res.cloudinary.com/toakeeassets/image/upload/s--hViaUCT9--/v1497743494/events/19030625_1389314694492303_6749445352138203782_n.jpg',
  'https://res.cloudinary.com/toakeeassets/image/upload/s--TA5P9YAK--/v1494622507/events/18425168_1097932713673984_3660071346111008452_n.jpg',
  'https://res.cloudinary.com/toakeeassets/image/upload/s---1d7OEUU--/v1497747626/events/64742e456fb347269841093e8b0813e5.jpg',
  'https://res.cloudinary.com/toakeeassets/image/upload/s--rUjsJjXc--/v1494366866/events/Ger_C3_B4nimo_foto-de-Andre-Lima.jpg',
  'https://res.cloudinary.com/toakeeassets/image/upload/s--tBm1oWsv--/v1497637201/events/29460_400x400.jpg',
];

const BannerImage = (url, index) => (
  <div className='BannerImage' key={index}>
    <img src={url} alt="slideshow" />
  </div>
);


function RightArrow (props) {
  const {className, onClick} = props
  return (
    <Button 
      circular
      className={className} 
      icon='chevron right' 
      onClick={onClick} 
    />
  );
}

function LeftArrow (props) {
  const {className, onClick} = props
  return (
    <Button 
      circular
      className={className}
      icon='chevron left'
      onClick={onClick}
    />
  );
};

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
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
};

const BannerCarousel = () => (
  <div className='Slider'>
    <Slider {...settings}>
      {images.map((url,index) => BannerImage(url, index))}
    </Slider>
  </div>
);

export default BannerCarousel;

