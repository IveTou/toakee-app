import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const socialLoginMutation = gql`
  mutation SocialLogin($network: SocialNetwork!, $token: String!) {
    socialLogin(network: $network, token: $token)
  }
`;

export const signUpMutation = gql`
  mutation SignUp(
    $username: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
  ) {
    signUp(
      username: $username,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
    )
  }
`;
