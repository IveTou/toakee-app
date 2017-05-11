export const navigatorName = () => {
  if (window.navigator.userAgent.search('MSIE') >= 0) {
    return 'MS Internet Explorer';
  } else if (window.navigator.userAgent.search('Chrome') >= 0) {
    return 'Google Chrome';
  } else if (window.navigator.userAgent.search('Firefox') >= 0) {
    return 'Mozilla Firefox';
  } else if (window.navigator.userAgent.search('Safari') >= 0) {
    return 'Apple Safari';
  } else if (window.navigator.userAgent.search('Opera') >= 0) {
    return 'Opera';
  }

  return 'Other';
};
