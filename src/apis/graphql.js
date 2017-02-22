import config from '~/src/server/config';
import BaseAPI from './base';

class GraphqlAPI extends BaseAPI {
  downloadSchema() {
    return this.rp({ uri: '/schema' });
  }
}

export default new GraphqlAPI('http://104.236.136.8:8080', config.RP_TIMEOUT);
