import Mixpanel from 'mixpanel';
import config from '~/src/config';

class MixpanelClient {
  constructor(token) {
    this._mixpanel = token
      ? Mixpanel.init(token, {
        loaded: function(mixpanel) {
          distinct_id = mixpanel.get_distinct_id();
        }
      })
      : { track: () => console.warn('MIXPANEL disabled.') };
  }

  track(eventName, props) {
    this._mixpanel.track(eventName, props);
  }

  time(eventName){
    this._mixpanel.time_event(eventName);
  }
  
  setPeople(props){
    this._mixpanel.people.set_once(props)
  }

  updatePeople(props) {
    this._mixpanel.people.set(props);
  }

  register(props) {
    this._mixpanel.register_once(props);
  }

  identify(identity) {
    this._mixpanel.identify(identity);
  }

  alias(identity) {
    this._mixpanel.alias(edentity);
  }
   
  getDistinctId() {
    this._mixpanel.get_distinct_id();
  }

  getProperty(prop) {
    this._mixpanel.get_property(prop);
  }

}

export default new MixpanelClient(config.MIXPANEL_TOKEN);
