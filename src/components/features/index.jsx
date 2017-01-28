import React from 'react';
import FeatureElement from '~/src/components/feature-element';
require('./style.scss');

const Features = () => ( 
  <div className="Features w3-container w3-padding-128">
  <h3 className="w3-center">Toakee!</h3>
    <p className="w3-center w3-large">Key features of our company</p>
    <div className="w3-row-padding w3-center">

      <FeatureElement/>
      <FeatureElement/>
      <FeatureElement/>
      <FeatureElement/>

    </div>

  </div>
);

export default Features;