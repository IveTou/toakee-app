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
}, reducer, {});

export default config;
