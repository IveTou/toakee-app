import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import { backgrounds } from '~/src/constants';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var idx;
declare var background;

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
  slideshow: PropTypes.bool,
};

export default AuthWrapper;
