import Relay from 'react-relay';

export default class LoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ login }`;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on LoginPayload {
            token
          }
        `,
      ],
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginPayload {
        token
      }
    `;
  }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password,
    };
  }
}
