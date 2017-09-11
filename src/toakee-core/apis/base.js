import agent from 'superagent';
import agentPrefix from 'superagent-prefix';
import agentPromise from 'superagent-promise';

const rp = agentPromise(agent, Promise);

export default class BaseApi {
  constructor(baseUrl) {
    this._prefix = agentPrefix(baseUrl);
  }

  get(path) {
    return rp.get(path).use(this._prefix).accept('text/javascript');
  }

  post(path) {
    return rp.post(path).use(this._prefix).accept('text/javascript');
  }
}
