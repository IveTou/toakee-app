import React from 'react';
require('./style.scss');

const FeatureElement = (props) => ( 
  <div className="FeatureElement w3-quarter ">
    <div className = "Container">
      <img className = "Image w3-round" src={props.image} alt="Features" />
      <p className="w3-large">{props.title}</p>
      {props.description}
    </div>
  </div>

);

export default FeatureElement;