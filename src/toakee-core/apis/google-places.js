import BaseApi from './base';

class GooglePlacesApi extends BaseApi {
  predict(input) {
    return super.get('/predict').query({ input }).then(req => req.body.predictions);
  }
}

const { protocol, host } = window.location;
export default new GooglePlacesApi(`${protocol}//${host}/gapi`);
