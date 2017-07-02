import React, { PropTypes } from 'react';
import { Card } from 'semantic-ui-react';

const propTypes = {
  children: PropTypes.node,
};

if (process.env.BROWSER) {
  require('./style.scss');
}

const AuthWrapper = ({ children }) => (
  <div className="AuthWrapper">
    <Card className="AuthWrapper-content">
      <Card.Content>
        {children}
      </Card.Content>
    </Card>
  </div>
);

AuthWrapper.propTypes = propTypes;

export default AuthWrapper;
