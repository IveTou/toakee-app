import config from '~/src/config';

export default [
  {
    title: 'Somos a peça que faltava no seu negócio.',
    subtitle: 'Seja nosso parceiro e descubra as vantagens de ter seus eventos no melhor guia de entretenimento.',
    img: `${config.ASSETS_BASE_URI}/core/site/banners/banner-parceria.jpg`,
    url: '/',
  },
  {
    title: 'Saiba o que está rolando na cidade!',
    subtitle: 'Cadastre-se e fique por dentro das novidades!',
    img: `${config.ASSETS_BASE_URI}/core/site/banners/banner-user.jpg`,
    url: '/cadastrar',
  },
  {
    title: 'Difícil divulgar seu evento em uma cidade grande como Salvador, não é?!',
    subtitle: 'Publique seu evento no melhor guia de eventos, é gratuito.',
    img: `${config.ASSETS_BASE_URI}/core/site/banners/banner-empresa.jpg`,
    url: '/',
  },
];
