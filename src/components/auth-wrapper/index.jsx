import React, { PropTypes } from 'react';

import Logo from '~/src/components/logo';

const propTypes = {
  children: PropTypes.node,
};

if (process.env.BROWSER) {
  require('./style.scss');
}

const AuthWrapper = ({ children }) => (
  <div className="AuthWrapper">
    <div className="AuthWrapper-content">
      <div className="AuthWrapper-content-box">
        {children}
      </div>
    </div>
  </div>
);

AuthWrapper.propTypes = propTypes;

export default AuthWrapper;
