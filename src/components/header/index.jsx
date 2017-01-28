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

  </div>
);

export default Header;