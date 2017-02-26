import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const StrikedText = ({ children }) => (
  <div className="StrikedText">
    <span className="StrikedText-content">{children}</span>
  </div>
);

StrikedText.propTypes = {
  children: PropTypes.node,
};

export default StrikedText;
