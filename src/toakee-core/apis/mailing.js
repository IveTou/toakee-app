import BaseAPI from './base';

class MailingAPI extends BaseAPI {
  post(path, { from, message, subscribe }) {
    return this.rp({
      method: 'POST',
      uri: path,
      body: { from, message, subscribe },
      json: true,
    });
  }

  send(from, message, subscribe) {
    return this.post('/send-email', {
      from: from,
      message: message,
      subscribe: subscribe,
    });
  }
}

const { protocol, host } = window.location;
export default new MailingAPI(`${protocol}//${host}`);
