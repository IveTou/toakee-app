import React, { PropTypes } from 'react';
import TopBar from '~/src/components/TopBar';

const Unlogged = ({ children }) => (
  <div className="Unlogged">
    <TopBar />
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
