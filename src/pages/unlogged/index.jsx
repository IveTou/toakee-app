import React, { PropTypes } from 'react';

require('./style.scss');

const Unlogged = ({ children }) => (
  <div className="Unlogged">
    {children}
  </div>
);

Unlogged.propTypes = {
  children: PropTypes.node,
};

Unlogged.defaultProps = {
  children: null,
};

export default Unlogged;
