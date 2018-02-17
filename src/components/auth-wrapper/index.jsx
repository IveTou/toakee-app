import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import classNames from 'classnames';

import { backgrounds } from '~/src/constants';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var idx;
declare var background;

const AuthWrapper = ({ children, slideshow }) => (
  <div className={classNames('AuthWrapper', { static: !slideshow })}>
    <If condition={slideshow}>
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
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
  slideshow: PropTypes.bool,
};

export default AuthWrapper;
