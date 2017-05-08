import iplocator from 'ip-locator';
import config from '~/src/config';
import BaseAPI from './base';

class TrackingAPI extends BaseAPI {
  post(path, eventName, props) {
    let options;

    if (eventName && props) {
      options = {
        name: eventName,
        props,
      };
    } else if (eventName) {
      options = { name: eventName };
    } else if (props) {
      options = { props };
    }

    return this.rp({
      method: 'POST',
      uri: path,
      body: options,
      json: true,
    });
  }

  track(eventName, props) {
    this.post('/events/track', eventName, props);
  }

  time(eventName) {
    this.post('/events/time', eventName, null);
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

  locale(fn) {
    iplocator.getDomainOrIPDetails('', 'json', (err, res) => {
      if (res) {
        fn(res);
      }
    });
  }

  navigator() {
    let nav;
    if (window.navigator.userAgent.search('MSIE') >= 0) {
      nav = 'MS Internet Explorer';
    } else if (window.navigator.userAgent.search('Chrome') >= 0) {
      nav = 'Google Chrome';
    } else if (window.navigator.userAgent.search('Firefox') >= 0) {
      nav = 'Mozilla Firefox';
    } else if (window.navigator.userAgent.search('Safari') >= 0) {
      nav = 'Apple Safari';
    } else if (window.navigator.userAgent.search('Opera') >= 0) {
      nav = 'Opera';
    } else {
      nav = 'Other';
    }

    return nav;
  }

}

export default new TrackingAPI(config.TOAKEE_URI, config.RP_TIMEOUT);
