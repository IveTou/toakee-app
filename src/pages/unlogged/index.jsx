import React, { PropTypes } from 'react';

import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import Footer from '~/src/components/footer';

import { includes } from 'lodash';

require('./style.scss');

const transparentRoutes = ['/', '/login', '/cadastrar'];

const Unlogged = ({ children }) => (
  <div className="Unlogged">
    <TopBar transparent={includes(transparentRoutes, location.pathname)} />
    <Snackbar />
    <main className="main">
      {children}
    </main>
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
