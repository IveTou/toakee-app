import config from '~/src/config';
import BaseAPI from './base';

class TrackingAPI extends BaseAPI {
  post(path, eventName, props) {
    return this.rp({
      method: 'POST',
      uri: path,
      body: {
        name: eventName,
        props,
      },
      json: true,
    });
  }

  track(eventName, props) {
    this.post('/events/track', eventName, props);
  }

}

export default new TrackingAPI(config.TOAKEE_URI, config.RP_TIMEOUT);
