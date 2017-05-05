import Mixpanel from 'mixpanel';
import config from '~/src/config';

class MixpanelClient {
  constructor(token) {
    this._mixpanel = token
      ? Mixpanel.init(token)
      : { track: () => console.warn('MIXPANEL disabled.') };
  }

  send(eventName, eventProps) {
    this._mixpanel.track(eventName, eventProps);
  }
  
  setPeople(peopleName, peopleProps){
    this._mixpanel.set_once(peopleName, peopleProps)
  }  

}

export default new MixpanelClient(config.MIXPANEL_TOKEN);
