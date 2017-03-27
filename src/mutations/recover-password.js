import Relay from 'react-relay';

export default class RecoverPasswordMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ recoverPassword }`;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on RecoverPasswordPayload {
            ok
          }
        `,
      ],
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RecoverPasswordPayload {
        ok
      }
    `;
  }

  getVariables() {
    return {
      token: this.props.token,
      email: this.props.email,
      newPassword: this.props.newPassword,
    };
  }
}
