import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';

require('./style.scss');

const Unlogged = ({ children }) => (
  <div className="Unlogged">
    <TopBar />
    <Snackbar />
    <main className="main">
      {children}
    </main>
  </div>
);

Unlogged.propTypes = {
  children: PropTypes.node,
};

Unlogged.defaultProps = {
  children: null,
};

export default Unlogged;
