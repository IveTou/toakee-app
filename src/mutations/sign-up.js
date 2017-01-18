import Relay from 'react-relay';

export default class SignupMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ signUp }`;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on SignUpPayload {
            token
          }
        `,
      ],
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignUpPayload {
        token
      }
    `;
  }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
    };
  }
}
