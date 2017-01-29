import React from 'react';
import FeatureElement from '~/src/components/feature-element';
require('./style.scss');

const image_src = 'https://placeimg.com/80/80/animals';

const description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

function getTitle() {
  return "Title";
}


const Features = () => ( 
  <div className="Features w3-container w3-padding-24">
  <h3 className="w3-center">Toakee!</h3>
    <p className="w3-center w3-large">Key features of our company</p>
    <div className="w3-row-padding w3-center">

      <FeatureElement image = {image_src} title={getTitle()} description ={description}/>
      <FeatureElement image = {image_src} title={getTitle()} description ={description}/>
      <FeatureElement image = {image_src} title={getTitle()} description ={description}/>
      <FeatureElement image = {image_src} title={getTitle()} description ={description}/>

    </div>

  </div>
);

export default Features;