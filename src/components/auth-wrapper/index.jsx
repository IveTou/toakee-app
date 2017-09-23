import React, { PropTypes } from 'react';
import { Card } from 'semantic-ui-react';
import classNames from 'classnames';

import { backgrounds } from '~/src/constants';

const propTypes = {
  children: PropTypes.node,
};

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var background;

const AuthWrapper = ({ children }) => (
  <div className={classNames('AuthWrapper', { static: location.pathname === '/login' })}>
    <If condition={location.pathname !== '/login'}>
      <ul className={classNames('AuthWrapper-slideshow')}>
        <For each="background" of={backgrounds}>
          <li>
            <span
              style={{
                backgroundImage: `url(${background.url})`,
                animationDelay: background.delay,
              }}
            />
          </li>
        </For>
      </ul>
    </If>
    <Card className="AuthWrapper-content">
      <Card.Content>
        {children}
      </Card.Content>
    </Card>
  </div>
);

AuthWrapper.propTypes = propTypes;

export default AuthWrapper;
