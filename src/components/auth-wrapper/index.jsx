import React, { PropTypes } from 'react';
import { Card } from 'semantic-ui-react';
import classNames from 'classnames';

import { backgrounds } from '~/src/constants';

import DefaultLayout from '~/src/layouts/default';

const propTypes = {
  children: PropTypes.node,
};

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var idx;
declare var background;

const AuthWrapper = ({ children }) => (
  <DefaultLayout>
    <div className={classNames('AuthWrapper', { static: location.pathname === '/login' })}>
      <If condition={location.pathname !== '/login'}>
        <ul className="AuthWrapper-slideshow">
          <For each="background" index="idx" of={backgrounds}>
            <li key={idx}>
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
  </DefaultLayout>
);

AuthWrapper.propTypes = propTypes;

export default AuthWrapper;
