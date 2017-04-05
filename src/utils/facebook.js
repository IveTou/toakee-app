import { extend } from 'lodash';
import { FACEBOOK_APP_ID } from '~/src/config';

export const fbInit = (callback) => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.8',
    });
    callback();
  };

  ((d, s, id) => {
    if (d.getElementById(id)) {
      callback();
      return;
    }

    const fjs = d.getElementsByTagName(s)[0];
    const js = d.createElement(s);
    extend(js, { id, src: '//connect.facebook.net/en_US/sdk.js' });
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};
