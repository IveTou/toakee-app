import { getToken } from '~/src/utils/session';
import config from '~/src/server/config';
import BaseAPI from './base';

class GraphQLAPI extends BaseAPI {
  downloadSchema() {
    return this.rp({ uri: '/schema' });
  }

  post(query, variables) {
    return this.rp({
      method: 'POST',
      uri: '/graphql',
      headers: {
        credentials: 'include',
        Authorization: getToken() ? `Bearer ${getToken()}` : '',
      },
      body: { query, variables },
      json: true,
    })
    .then(({ data, errors }) => {
      if (errors) throw errors.map(e => e.message);
      return data;
    });
  }
}

export default new GraphQLAPI(config.GRAPHQL_URI, config.RP_TIMEOUT);
