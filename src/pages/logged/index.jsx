import React, { PropTypes } from 'react';

import TopBar from '~/src/components/top-bar';
import Dialog from '~/src/components/dialog';

require('./style.scss');

const Logged = ({ children }) => (
  <div className="Logged">
    <TopBar />
    <Dialog />
    <main className="main">
      {children}
    </main>
  </div>
);

Logged.propTypes = {
  children: PropTypes.node,
};

Logged.defaultProps = {
  children: null,
};

export default Logged;
