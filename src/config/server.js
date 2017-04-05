import { reduce } from 'lodash';

const env = (key, miss) => (process.env[key] || miss);
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  PORT: 3000,
  SUPPORT_EMAIL: 'support@toakee.com',
}, reducer, {});

export default config;
