import React from 'react';
import FeatureElement from './feature-element';

const imageSource = 'https://placeimg.com/80/80/animals';

const features = [
  {
    title: 'First Feature',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.',
  },
  {
    title: 'Second Feature',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust',
  },
  {
    title: 'Third Feature',
    description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley ',
  },
  {
    title: 'Fourth Feature',
    description: 'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
];

declare var item;
declare var idx;

const Features = () => (
  <div className="Features w3-container w3-padding-24">
    <h3 className="w3-center">Toakee!</h3>
    <p className="w3-center w3-large">Key features of our company</p>
    <div className="w3-row-padding w3-center">
      <For each="item" in index="idx" of={features}>
        <FeatureElement
          key={idx}
          image={imageSource}
          title={item.title}
          description={item.description}
        />
      </For>
    </div>
  </div>
);

export default Features;
