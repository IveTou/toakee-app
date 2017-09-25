import config from '~/src/config';

const { ASSETS_BASE_URI, ASSETS_BANNERS_PATH } = config;

const banners = [
  {
    title: '',
    subtitle: '',// eslint-disable-line
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/parada.jpg`,
    url: '/evento/16-parada-lgbt-de-salvador-2017',
  },
  {
    title: 'Somos a peça que faltava no seu negócio.',
    subtitle: 'Seja nosso parceiro e descubra as vantagens de ter seus eventos no melhor guia de entretenimento.',// eslint-disable-line
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/parceria.jpg`,
    url: '/quem-somos',
  },
  {
    title: 'Saiba o que está rolando na cidade!',
    subtitle: 'Cadastre-se e fique por dentro das novidades!',
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/user.jpg`,
    url: '/cadastrar',
  },
  {
    title: 'Difícil divulgar seu evento em uma cidade grande como Salvador, não é?!',
    subtitle: 'Publique seu evento no melhor guia de eventos, é gratuito.',
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/empresa.jpg`,
    url: '/',
  },
];

export default banners;
