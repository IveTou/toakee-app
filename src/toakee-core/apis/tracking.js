import BaseAPI from './base';

class TrackingAPI extends BaseAPI {
  sendTrack(eventName, props) {
    this.rp({
      method: 'POST',
      uri: '/events/track',
      body: { name: eventName, props },
      json: true,
    });
  }
}

export default new TrackingAPI();
