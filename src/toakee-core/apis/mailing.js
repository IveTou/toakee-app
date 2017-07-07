import BaseAPI from './base';

class MailingAPI extends BaseAPI {
  post(path, props) {
    return this.rp({
      method: 'POST',
      uri: path,
      body: {
        props,
      },
      json: true,
    });
  }

  sendMail(from, content) {
    this.post('/send-mail',{
      from: from,
      content: content,
    });
  }
}

const { protocol, host } = window.location;
export default new MailingAPI(`${protocol}//${host}`);
