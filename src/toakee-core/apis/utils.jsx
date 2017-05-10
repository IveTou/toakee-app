import iplocator from 'ip-locator';

class UtilsAPI {

  locale(fn) {
    iplocator.getDomainOrIPDetails('', 'json', (err, res) => {
      if (res) {
        fn(res);
      }
    });
  }

  navigator() {
    let nav;
    if (window.navigator.userAgent.search('MSIE') >= 0) {
      nav = 'MS Internet Explorer';
    } else if (window.navigator.userAgent.search('Chrome') >= 0) {
      nav = 'Google Chrome';
    } else if (window.navigator.userAgent.search('Firefox') >= 0) {
      nav = 'Mozilla Firefox';
    } else if (window.navigator.userAgent.search('Safari') >= 0) {
      nav = 'Apple Safari';
    } else if (window.navigator.userAgent.search('Opera') >= 0) {
      nav = 'Opera';
    } else {
      nav = 'Other';
    }

    return nav;
  }
}

export default new UtilsAPI();
