import { reduce } from 'lodash';

const env = (key, miss) => (process.env[key] || miss);
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const defaultUri = 'http://localhost:3000';

const PORT = env('PORT', 3000);
const BASE_URI = env('BASE_URI', `http://localhost:${PORT}`);

const config = reduce({
  GRAPHQL_URI: 'http://localhost:4000',
  SOCIAL_REDIRECT_URI: `${BASE_URI}/social-login`,
  FACEBOOK_APP_ID: '',
  INSTAGRAM_APP_ID: '',
  RP_TIMEOUT: 5000,
  SUPPORT_EMAIL: 'support@toakee.com',
}, reducer, { PORT, BASE_URI });

export default config;
