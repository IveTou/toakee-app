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

  setPeople(props) {
    this.post('/events/set-people', null, props);
  }

  updatePeople(props) {
    this.post('/events/update-people', null, props);
  }

  alias(identity) {
    this.post('/events/alias', null, identity);
  }

}

export default new TrackingAPI(config.TOAKEE_URI, config.RP_TIMEOUT);
