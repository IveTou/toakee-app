import React from 'react';
import PropTypes from 'prop-types';

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
