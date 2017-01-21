import React, { PropTypes } from 'react';
import autoBind from 'auto-bind';
import Button from 'react-toolbox/lib/button';

import config from '~/app/config';

const propTypes = {
  onReceiveToken: PropTypes.func,
};

const defaultProps = {
  onReceiveToken: () => {},
};

export default class FacebookLoginButton extends React.Component {
  defaultProps: defaultProps;

  constructor(props: propTypes) {
    super(props);
    this.state = {
      fbInitialized: false,
    };
    autoBind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: config.FACEBOOK_APP_ID,
        xfbml: true,
        version: 'v2.8',
      });

      this.setState({ fbInitialized: true });
      FB.getLoginStatus(this.onStatusChange);
    };

    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onStatusChange({ authResponse }) {
    if (authResponse) {
      this.props.onReceiveToken(authResponse.accessToken);
    }
  }

  facebookLogin() {
    FB.login(this.onStatusChange, { scope: 'public_profile,email' });
  }

  render() {
    return (
      <Button
        label="Entrar com o facebook"
        onClick={this.facebookLogin}
        disabled={!this.state.fbInitialized}
        raised
      />
    );
  }
}

