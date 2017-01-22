import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';

require('./style.scss');

const Logged = ({ children }) => (
  <div className="Logged">
    <TopBar />
    {children}
  </div>
);

Logged.propTypes = {
  children: PropTypes.node,
};

Logged.defaultProps = {
  children: null,
};

export default Logged;
