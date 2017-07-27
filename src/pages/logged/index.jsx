import React, { PropTypes } from 'react';

import TopBar from '~/src/components/top-bar';
import Dialog from '~/src/components/dialog';
import Footer from '~/src/components/footer';

require('./style.scss');

const Logged = ({ children }) => (
  <div className="Logged">
    <TopBar />
    <Dialog />
    <main className="main">
      {children}
    </main>
    <Footer />
  </div>
);

Logged.propTypes = {
  children: PropTypes.node,
};

Logged.defaultProps = {
  children: null,
};

export default Logged;
