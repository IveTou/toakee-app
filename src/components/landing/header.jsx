import React from 'react';

const Header = () => (
  <div className="Header bgimg-1 w3-display-container">
    <div className="Content w3-row">
      <div className="LeftBlock w3-col w3-container l7">
        <div className="span w3-jumbo w3-hide-small">
          The greatest take away message!
        </div>
        <div className="span w3-xxlarge w3-hide-large w3-hide-medium">
          Another take away message for mobile users!
        </div>
        <br />
        <div className="span w3-large">
          Here more details about what is worth to keep on mind regard to our product.
        </div>
        <p className="cta">
          <a
            href="#contact"
            className="w3-btn w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off"
          >
            Contacte-nos!
          </a>
        </p>
        <div className="brands w3-xlarge">
          <a className="Icon w3-hover-text-white">
            <i className="fa fa-facebook-official" />
          </a>
        </div>
      </div>
      <div className="RightBlock w3-col w3-container l5">
        <img src="/img/app-handled.png"  alt="Image App on Hands" />
      </div>
   </div>
  </div>
);

export default Header;
