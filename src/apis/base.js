import rp from 'request-promise';

export default class BaseAPI {
  constructor(baseUrl, timeout) {
    this.rp = rp.defaults({
      json: true,
      baseUrl,
      timeout,
    });
  }
}
