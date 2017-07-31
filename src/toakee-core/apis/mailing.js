import BaseAPI from './base';

class MailingAPI extends BaseAPI {
  post(path, { from, name, message, subscribe }) {
    return this.rp({
      method: 'POST',
      uri: path,
      body: { from, name, message, subscribe },
      json: true,
    });
  }

  send(from, name, message, subscribe) {
    return this.post('/send-email', { from, name, message, subscribe });
  }
}

const { protocol, host } = window.location;
export default new MailingAPI(`${protocol}//${host}`);
