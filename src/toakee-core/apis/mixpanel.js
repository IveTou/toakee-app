import Mixpanel from 'mixpanel';
import config from '~/src/config';

class MixpanelAPI {
  constructor(token) {
    this._mixpanel = token
      ? Mixpanel.init(token)
      : { track: () => console.warn('MIXPANEL disabled.') };
  }

  track(eventName, props) {
    this._mixpanel.track(eventName, props);
  }

}

export default new MixpanelAPI(config.MIXPANEL_TOKEN);
