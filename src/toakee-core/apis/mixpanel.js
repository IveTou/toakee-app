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

}

export default new MixpanelClient(config.MIXPANEL_TOKEN);
