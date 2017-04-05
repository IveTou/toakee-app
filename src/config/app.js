const devMode = process.env.NODE_ENV !== 'production';

const BASE_URI = devMode
  ? 'http://localhost:3000'
  : 'https://toakee.herokuapp.com';

export default {
  RP_TIMEOUT: 5000,
  SOCIAL_REDIRECT_URI: `${BASE_URI}/social-login`,
  GRAPHQL_URI: devMode
    ? 'http://localhost:4000'
    : 'https://graphql-api.herokuapp.com',
  FACEBOOK_APP_ID: '1848071472114729',
  INSTAGRAM_APP_ID: 'e054e2eab38043d78abd577d5800d994',
  RECAPTCHA_SITE_KEY: '6LcbbxsUAAAAAEpNul2MOigAfpvpWVF0hN_ZMfBj',
};
