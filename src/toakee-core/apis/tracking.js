import BaseAPI from './base';
import iplocator from 'ip-locator';
import config from '~/src/config';

class TrackingAPI extends BaseAPI {
  post(path, eventName, props) {
    var options;

    if(eventName && props) {
      options = {
        name: eventName,
        props
      };
    } else if(eventName) {
      options = {name: eventName };
    } else if(props) {
      options = { props };
    }
    
    console.log(options);

    return this.rp({
      method: 'POST',
      uri: path,
      body: options,
      json: true,
    }).then(function (repos) {
      console.log(repos);
    })
    .catch(function (err) {
      console.log(err)
    });
  }

  track(eventName, props) {
    this.post('/events/track', eventName, props);
  }

  time(eventName) {
    this.post('/events/time', eventName, null);
  }

  setPeople(props){
    this.post('/events/set-people', null, props);
  }

  updatePeople(props) {
    this.post('/events/update-people', null, props);
  }

  alias(identity) {
    this.post('/events/alias', null, identity);
  }

  locale(fn){
    iplocator.getDomainOrIPDetails('', 'json', (err, res) => {
      if(err) {
        console.log(err);
      } else {
        fn(res);
      }
    });
  }

}

export default new TrackingAPI(config.TOAKEE_URI, config.RP_TIMEOUT);
