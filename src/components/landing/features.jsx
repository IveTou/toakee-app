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
  <div className="Features  bgimg-1 w3-display-container">    
    <div className="Content w3-row">    
      <div className="w3-col w3-container l6">    
        <span className="Span w3-jumbo w3-hide-small">    
          The greatest take away message!    
        </span>    
        <span className="Span w3-xxlarge w3-hide-large w3-hide-medium">    
          Another take away message for mobile users!    
        </span>    
        <br />    
        <span className="Span w3-large">    
          Here more details about what is worth to keep on mind regard to our product.              
        </span>
      </div>
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
