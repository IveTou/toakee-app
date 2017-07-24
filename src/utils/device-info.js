import device from 'device';

export const deviceInfo = (() => {
  const info = device(window.navigator.userAgent);

  return {
    isMobile: info.is('mobile') || info.is('tablet') || info.is('car'),
    isDesktop: info.is('desktop'),
    ...info,
  };
})();
