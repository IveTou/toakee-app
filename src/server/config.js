import { reduce } from 'lodash';

const env = (key, miss) => (process.env[key] || miss);
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });
const devMode = process.env.NODE_ENV !== 'production';

const config = reduce({
  PORT: 3000,
  MIXPANEL_TOKEN: devMode
    ? '7b57fa79fe746a43e479aa0f416d9e23'
    : '4de036ffde489bc4ecdc1e03498aab2b',
  GOOGLE_PLACES_KEY: 'AIzaSyBzXt5xYCgP8Vna4D_BZm5pcVdLQv4WQQU',
  GRAPHQL_URI: devMode
    ? 'http://localhost:4000/graphql'
    : 'https://graphql-api.herokuapp.com/graphql',
  FACEBOOK_APP_ID: '1848071472114729',
  ASSETS_BASE_URI: 'http://res.cloudinary.com/toakeeassets/image/upload/s--Ug65JuU_--/v1494199755',
}, reducer, {});

export default config;
