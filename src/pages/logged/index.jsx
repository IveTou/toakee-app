import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';

require('./style.scss');

const Logged = ({ children }) => (
  <div className="Logged mdl-layout mdl-layout--fixed-header mdl-js-layout">
    <TopBar />
    <main className="main mdl-layout__content">
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
