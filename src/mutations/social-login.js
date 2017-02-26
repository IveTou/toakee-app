import Relay from 'react-relay';

export default class SocialLoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ socialLogin }`;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on SocialLoginPayload {
            token
          }
        `,
      ],
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SocialLoginPayload {
        token
      }
    `;
  }

  getVariables() {
    return {
      token: this.props.token,
      network: this.props.network.toUpperCase(),
    };
  }
}
