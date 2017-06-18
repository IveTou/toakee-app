import React from 'react';

import Slider from 'react-slick';
import { Button } from 'semantic-ui-react'

if (process.env.BROWSER) {
  require('./style.scss');
}


const images = [
  'https://catracalivre.com.br/wp-content/uploads/2015/10/imagens-3D_11.gif',
  'https://cdn.mensagenscomamor.com/content/images/p000002673.jpg?v=0',
  'https://s-media-cache-ak0.pinimg.com/originals/9d/8b/e8/9d8be883d5ee9887c6575d5561549d2e.jpg',
  'http://marketingdeconteudo.com/wp-content/uploads/2016/08/imagens-gratis-4.jpg',
  'https://static.tudointeressante.com.br/uploads/2013/12/imagens-aereas-surpreendentes.png',
  'http://esquenta.com.br/wp-content/uploads/2013/09/10007959-1367035383184.jpg',
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

