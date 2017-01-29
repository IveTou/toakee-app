import React from 'react';
require('./style.scss');

const Header = () => ( 
  <div className="Header bgimg-1 w3-display-container w3-grayscale-min" >
      <span className = " Span w3-jumbo w3-hide-small" >The greatest take away message!
      </span>

      <span className = " Span w3-xxlarge w3-hide-large w3-hide-medium">Another take away message for mobile users!
      </span>

      <br></br>

      <span className = " Span w3-large">Here more details about what is worth to keep on mind regard to our product.
      </span>

      <p><a href="#contact" className="w3-btn w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Contacte-nos!</a></p>

      <div className=" Brands w3-xlarge">
        <a href="#" className="Icon w3-hover-text-white"><i className="fa fa-facebook-official"></i></a>
        {/*
        <a href="#" className="Icon w3-hover-text-white"><i className="fa fa-flickr"></i></a>
        <a href="#" className="Icon w3-hover-text-white"><i className="fa fa-instagram"></i></a>
        <a href="#" className="Icon w3-hover-text-white"><i className="fa fa-twitter"></i></a>
        <a href="#" className="Icon w3-hover-text-white"><i className="fa fa-linkedin"></i></a>
        */}
      </div>

  </div>
);

export default Header;