import React, { PropTypes } from 'react';
import { Card } from 'semantic-ui-react';
import autoBind from 'react-autobind';

import { backgrounds } from '~/src/constants';

const propTypes = {
  children: PropTypes.node,
};

if (process.env.BROWSER) {
  require('./style.scss');
}

class AuthWrapper extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderBackgrounds() {
    return backgrounds.map(bg =>
      <li>
        <span style={{ backgroundImage: `url(${bg.url})`, animationDelay: bg.delay }} />
      </li>
    );
  }

  render() {
    return (
      <div className="AuthWrapper">
        <ul className="slideshow">{this.renderBackgrounds()}</ul>
        <Card className="AuthWrapper-content">
          <Card.Content>
            {this.props.children}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

AuthWrapper.propTypes = propTypes;

export default AuthWrapper;
