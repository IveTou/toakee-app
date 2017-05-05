import BaseAPI from './base'; 
import config from '~/src/config';

class TrackingAPI extends BaseAPI {
  sendTrack(eventName, props) {
    return this.rp({
      method: 'POST',
      uri: '/events/track',
      body: {
        name: eventName,
        props
      },
      json: true,
    }).then(function (repos) {
      console.log(repos);
    })
    .catch(function (err) {
      console.log(err)
    });
  }
}

export default new TrackingAPI('http://localhost:3000', config.RP_TIMEOUT);
