import rp from 'request-promise';

export default class BaseAPI {
  constructor(baseUrl, timeout = 5000) {
    this.rp = rp.defaults({
      json: true,
      baseUrl,
      timeout,
    });
  }
}
