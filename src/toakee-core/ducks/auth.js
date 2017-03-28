import { logout as sessionLogout } from '~/src/utils/session';
import GraphQLAPI from '../apis/graphql';
import { buildMutationQuery } from '../utils';

export const LOGOUT = 'auth/LOGOUT';

const loginQuery = buildMutationQuery(
  'login',
  { username: 'String!', password: 'String!' },
);

const socialLoginQuery = buildMutationQuery(
  'socialLogin',
  { network: 'SocialNetwork!', token: 'String!' },
);

const signUpQuery = buildMutationQuery(
  'signUp',
  {
    username: 'String!',
    password: 'String!',
    firstName: 'String!',
    lastName: 'String!',
    email: 'String!',
  },
);

const recoverPasswordQuery = buildMutationQuery(
  'recoverPassword',
  { email: 'String', password: 'String' },
);

export const login =
  (username, password) => GraphQLAPI.post(loginQuery, { username, password });

export const socialLogin =
  (network, token) => GraphQLAPI.post(socialLoginQuery, { network, token });

export const signUp = (username, password, firstName, lastName, email) => (
  GraphQLAPI.post(signUpQuery, { username, password, firstName, lastName, email })
);

export const recoverPassword =
  (email, password) => GraphQLAPI.post(recoverPasswordQuery, { email, password });

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  sessionLogout();
};
