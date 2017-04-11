import React, { PropTypes } from 'react';

import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';

require('./style.scss');

const Unlogged = ({ children }) => (
  <div className="Unlogged mdl-layout mdl-layout--fixed-header mdl-js-layout">
    <TopBar />
    <Snackbar />
    <main className="main mdl-layout__content">
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
