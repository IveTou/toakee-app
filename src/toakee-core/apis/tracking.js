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

  viewerSafeTrack(viewer = {}, eventName) {
    const pid = viewer.id || 'Guest';
    const name = `${viewer.id ? 'Logged' : 'Unlogged'} ${eventName}`;
    this.track({ name, pid });
  }
}

const { protocol, host } = window.location;
export default new TrackingAPI(`${protocol}//${host}`);
