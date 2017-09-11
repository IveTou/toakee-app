import { CLOUDINARY_API_URI, UPLOAD_FLYER_PRESET } from '~/src/config';
import BaseApi from './base';

class CloudinaryApi extends BaseApi {
  uploadFlyer(file) {
    return super.post('/upload')
      .field('upload_preset', UPLOAD_FLYER_PRESET)
      .field('file', file)
      .then(req => req.body);
  }
}

export default new CloudinaryApi(CLOUDINARY_API_URI);
