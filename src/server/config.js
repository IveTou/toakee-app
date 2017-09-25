import { reduce } from 'lodash';

const env = (key, miss) => (process.env[key] || miss);
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });
const devMode = process.env.NODE_ENV !== 'production';

const config = reduce({
  PORT: 3000,
  SUPPORT_EMAIL: 'support@toakee.com',
  MIXPANEL_TOKEN: devMode
    ? '7b57fa79fe746a43e479aa0f416d9e23'
    : '4de036ffde489bc4ecdc1e03498aab2b',
  SENDGRID_API_KEY: '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',
  GOOGLE_PLACES_KEY: 'AIzaSyBzXt5xYCgP8Vna4D_BZm5pcVdLQv4WQQU',
  GRAPHQL_URI: devMode
    ? 'http://localhost:4000/graphql'
    : 'https://graphql-api.herokuapp.com/graphql',
}, reducer, {});

export default config;
