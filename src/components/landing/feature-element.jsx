import React, { PropTypes } from 'react';

require('./style.scss');

const FeatureElement = ({ index, image, title, description }) => (
  index % 2 === 0 ? (
    <div className={`FeatureElement feature-${index}  i3-container w3-row  w3-large w3-padding-12`}>
      <div className="w3-col w3-container m7 l7">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="w3-col w3-container m5 l5">
        <img src={image} alt="feature" />
      </div>
    </div>
  ) :
  (
    <div className={`FeatureElement feature-${index}  i3-container w3-row  w3-large w3-padding-12`}>
      <div className="w3-col w3-container m5 l5">
        <img src={image} alt="feature" />
      </div>
      <div className="w3-col w3-container m7 l7">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
);

FeatureElement.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureElement;
