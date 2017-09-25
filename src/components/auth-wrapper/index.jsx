import React, { PropTypes } from 'react';
import { Card } from 'semantic-ui-react';

import DefaultLayout from '~/src/layouts/default';

const propTypes = {
  children: PropTypes.node,
};

if (process.env.BROWSER) {
  require('./style.scss');
}

const AuthWrapper = ({ children }) => (
  <DefaultLayout>
    <div className="AuthWrapper">
      <Card className="AuthWrapper-content">
        <Card.Content>
          {children}
        </Card.Content>
      </Card>
    </div>
  </DefaultLayout>
);

AuthWrapper.propTypes = propTypes;

export default AuthWrapper;
