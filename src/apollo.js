import ApolloClient, { createNetworkInterface } from 'apollo-client';

import config from '~/src/config';
import { getToken } from '~/src/utils/session';

const networkInterface = createNetworkInterface({ uri: config.GRAPHQL_URI });

networkInterface.use([{
  applyMiddleware: (req, next) => {
    if (getToken()) {
      const authorization = `Bearer ${getToken()}`;
      req.options.headers = Object.assign(req.options.headers || {}, { authorization });
    }
    next();
  },
}]);

export default new ApolloClient({
  initialState: window.__APOLLO_STATE__,
  networkInterface,
  shouldBatch: true,
});
