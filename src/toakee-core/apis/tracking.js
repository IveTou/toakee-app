import { navigatorName } from '~/src/utils/navigator';
import BaseAPI from './base';

class TrackingAPI extends BaseAPI {
  post(path, eventName, props) {
    return super.post(path).send({ name: eventName, props }).end();
  }

  track(eventName, pid) {
    this.post('/events/track', eventName, {
      distinct_id: pid,
      path: location.pathname,
      $browser: navigatorName(),
      $referring_domain: document.referrer,
    });
  }
}

const { protocol, host } = window.location;
export default new TrackingAPI(`${protocol}//${host}`);
