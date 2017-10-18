import { navigatorName } from '~/src/utils/navigator';
import BaseAPI from './base';

class TrackingAPI extends BaseAPI {
  post(path, name, props) {
    return super.post(path).send({ name, props }).end();
  }

  track({ name, pid }) {
    this.post('/events/track', name, {
      distinct_id: pid,
      path: location.pathname,
      $browser: navigatorName(),
      $referring_domain: document.referrer,
    });
  }
}

const { protocol, host } = window.location;
export default new TrackingAPI(`${protocol}//${host}`);
