import { reduce } from 'lodash';

const env = (key, miss) => process.env[key] || miss;
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  GRAPHQL_URI: 'http://localhost:4000/graphql',
  PORT: 3000,
}, reducer, {});

export default config;
