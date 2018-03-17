import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const AuthWrapper = ({ children }) => (
  <div className="AuthWrapper static">
    <Card className="AuthWrapper-content">
      <Card.Content>
        {children}
      </Card.Content>
    </Card>
  </div>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
