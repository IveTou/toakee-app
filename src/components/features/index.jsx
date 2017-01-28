import React from 'react';
require('./style.scss');

const Features = () => ( 
  <div className="Features w3-container w3-padding-128">
  <h3 className="w3-center">Toakee!</h3>
    <p className="w3-center w3-large">Key features of our company</p>
    <div className="w3-row-padding w3-center">

      <div className="w3-quarter">
        <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
        <p className="w3-large">Responsive</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
      </div>

    </div>

  </div>
);

export default Features;