import Mixpanel from 'mixpanel';
import config from '~/src/config';

class MixpanelClient {
  constructor(token) {
    this._mixpanel = token
      ? Mixpanel.init(token)
      : { track: () => console.warn('MIXPANEL disabled.') };
  }

  track(eventName, props) {
    this._mixpanel.track(eventName, props);
  }

  setPeople(props) {
    this._mixpanel.people.set_once(props);
  }

  updatePeople(props) {
    this._mixpanel.people.set(props);
  }

  alias(identity) {
    this._mixpanel.alias(identity);
  }

}

export default new MixpanelClient(config.MIXPANEL_TOKEN);
