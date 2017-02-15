import React, { PropTypes } from 'react';
import autoBind from 'auto-bind';
import Button from 'react-toolbox/lib/button';

import { fbInit } from '~/src/utils/facebook';

const propTypes = {
  onReceiveToken: PropTypes.func,
};

const defaultProps = {
  onReceiveToken: () => {},
};

export default class FacebookLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fbInitialized: false };
    autoBind(this);
  }

  componentDidMount() {
    fbInit(() => {
      this.setState({ fbInitialized: true });
      FB.getLoginStatus(this.onStatusChange);
    });
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

FacebookLoginButton.defaultProps = defaultProps;
FacebookLoginButton.propTypes = propTypes;
