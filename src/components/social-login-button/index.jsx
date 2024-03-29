import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from 'material-ui';

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

const styles = theme => ({
  facebook: {
    backgroundColor: '#3B5998',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#304D8A',
    },
  },
});

const SocialLoginButton = ({ network, onReceiveToken, classes }) => {
  const login = () => {
    const popup = window.open(url[network]);
    const listener = ({ key, newValue }) => {
      if (key === 'socialLogin') {
        onReceiveToken(network, newValue);
        window.removeEventListener('storage', listener);
        popup.close();
      }
    };

    window.addEventListener('storage', listener);
  };

  return (
    <Button className={classes.facebook} onClick={login} fullWidth variant="raised">
      Entrar com facebook
    </Button>
  );
};

SocialLoginButton.propTypes = {
  onReceiveToken: PropTypes.func,
  network: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(SocialLoginButton);
