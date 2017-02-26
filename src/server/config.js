import { reduce } from 'lodash';

const env = (key, miss) => (process.env[key] || miss);
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  GRAPHQL_URI: 'http://localhost:4000/graphql',
  BASE_URI: 'http://localhost:3000',
  SOCIAL_REDIRECT_URI: 'http://localhost:3000/social-login',
  FACEBOOK_APP_ID: '',
  INSTAGRAM_APP_ID: '',
  PORT: 3000,
  RP_TIMEOUT: 5000,
  SUPPORT_EMAIL: 'support@toakee.com',
}, reducer, {});

export default config;
