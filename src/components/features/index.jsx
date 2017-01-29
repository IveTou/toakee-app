import React from 'react';
import FeatureElement from '~/src/components/feature-element';

require('./style.scss');

const imageSource = 'https://placeimg.com/80/80/animals';

const description = {
  first: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.',
  second: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust',
  third: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley ',
  fourth: 'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
};

const title = {
  first: 'First Feature',
  second: 'Second Feature',
  third: 'Third Feature',
  fourth: 'Fourth Feature',
};

const Features = () => (
  <div className="Features w3-container w3-padding-24">
    <h3 className="w3-center">Toakee!</h3>
    <p className="w3-center w3-large">Key features of our company</p>
    <div className="w3-row-padding w3-center">
      <FeatureElement image={imageSource} title={title.first} description={description.first} />
      <FeatureElement image={imageSource} title={title.second} description={description.second} />
      <FeatureElement image={imageSource} title={title.third} description={description.third} />
      <FeatureElement image={imageSource} title={title.fourth} description={description.fourth} />
    </div>
  </div>
);

export default Features;
