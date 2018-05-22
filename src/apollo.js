import 'fetch-everywhere';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

import config from '~/src/config';
import { getToken } from '~/src/utils/session';

const link = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext({
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
  return forward(operation);
}).concat(createHttpLink({ uri: config.GRAPHQL_URI }));

export default new ApolloClient({
  link,
  shouldBatch: true,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});
