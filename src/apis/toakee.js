import config from '~/src/server/config';
import BaseAPI from './base';

class ToakeeAPI extends BaseAPI {
  sendEmail(senderName, senderEmail, subject, body) {
    return this.rp({
      uri: '/send-email',
      method: 'POST',
      body: { name: senderName, email: senderEmail, subject, body },
    });
  }
}

export default new ToakeeAPI(config.BASE_URI, config.RP_TIMEOUT);
