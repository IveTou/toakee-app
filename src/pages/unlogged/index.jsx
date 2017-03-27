import React, { PropTypes } from 'react';

import Snackbar from '~/src/components/snackbar';
import Footer from '~/src/components/footer';

require('./style.scss');

const Unlogged = ({ children }) => (
  <div className="Unlogged">
    <Snackbar />
    {children}
    <Footer />
  </div>
);

Unlogged.propTypes = {
  children: PropTypes.node,
};

Unlogged.defaultProps = {
  children: null,
};

export default Unlogged;
