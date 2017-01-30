import React, { PropTypes } from 'react';

require('./style.scss');

const FeatureElement = ({ image, title, description }) => (
  <div className="FeatureElement w3-quarter">
    <div className="Container">
      <img className="Image w3-round" src={image} alt="Features" />
      <p className="w3-large">{title}</p>
      {description}
    </div>
  </div>
);

FeatureElement.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureElement;
