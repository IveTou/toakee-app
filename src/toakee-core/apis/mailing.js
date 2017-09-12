import BaseAPI from './base';

class MailingAPI extends BaseAPI {
  send(from, name, message, subscribe) {
    return super.post('/send-email')
      .send({ from, name, message, subscribe })
      .then(res => res.body);
  }
}

const { protocol, host } = window.location;
export default new MailingAPI(`${protocol}//${host}`);
