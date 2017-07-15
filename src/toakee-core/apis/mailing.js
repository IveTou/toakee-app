import BaseAPI from './base';

class MailingAPI extends BaseAPI {
  post(path, props) {
    return this.rp({
      method: 'POST',
      uri: path,
      body: {
        from: props.from,
        message: props.message,
        subscribe: props.subscribe,
      },
      json: true,
    });
  }

  send(a, b, c) {
    return this.post('/send-email', {
      from: a,
      message: b,
      subscribe: c,
    });
  }
}

const { protocol, host } = window.location;
export default new MailingAPI(`${protocol}//${host}`);
