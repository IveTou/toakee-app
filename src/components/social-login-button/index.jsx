import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { capitalize } from 'lodash';
import { Button, Icon } from 'semantic-ui-react';

import config from '~/src/config';

const { FACEBOOK_APP_ID, INSTAGRAM_APP_ID, SOCIAL_REDIRECT_URI } = config;

if (process.env.BROWSER) {
  require('./style.scss');
}

const redirectUri = `${location.protocol}//${location.host}${SOCIAL_REDIRECT_URI}`;

const query = clientId => [
  `client_id=${clientId}`,
  `redirect_uri=${encodeURIComponent(redirectUri)}`,
  'response_type=token',
].join('&');

const url = {
  facebook: `https://www.facebook.com/v2.8/dialog/oauth?${query(FACEBOOK_APP_ID)}`,
  instagram: `https://api.instagram.com/oauth/authorize?${query(INSTAGRAM_APP_ID)}`,
};

const icon = {
  facebook: 'facebook f',
  instagram: 'instagram',
};

const propTypes = {
  onReceiveToken: PropTypes.func,
  service: PropTypes.string,
};

const defaultProps = {
  onReceiveToken: () => {},
};

export default class SocialLoginButton extends React.Component {
  defaultProps: defaultProps;

  constructor(props: propTypes) {
    super(props);
    autoBind(this);
  }

  login() {
    const { network } = this.props;

    const popup = window.open(url[network]);
    const listener = ({ key, newValue }) => {
      if (key === 'socialLogin') {
        this.props.onReceiveToken(network, newValue);
        window.removeEventListener('storage', listener);
        popup.close();
      }
    };

    window.addEventListener('storage', listener);
  }

  render() {
    const { network } = this.props;
    return (
      <Button color={network} onClick={this.login} fluid>
        <Icon name={icon[network]} /> {capitalize(network)}
      </Button>
    );
  }
}

