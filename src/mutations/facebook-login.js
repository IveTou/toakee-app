import Relay from 'react-relay';

export default class FacebookLoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ facebookLogin }`;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on FacebookLoginPayload {
            token
          }
        `,
      ],
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on FacebookLoginPayload {
        token
      }
    `;
  }

  getVariables() {
    return {
      token: this.props.token,
    };
  }
}
