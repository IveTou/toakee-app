import config from '~/src/config';

const { ASSETS_BASE_URI, ASSETS_BANNERS_PATH } = config;

const banners = [
  {
    title: '',
    subtitle: '',// eslint-disable-line
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/atlantis.png`,
    url: '/evento/59e9200e55d748000444bd2d',
    description: 'atlantis',
  },
  {
    title: '',
    subtitle: '',// eslint-disable-line
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/capa-insanno.png`,
    url: '/evento/5956f979624af5000473fa5d',
    description: 'insanno',
  },
  {
    title: '',
    subtitle: '',// eslint-disable-line
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/parada.jpg`,
    url: '/evento/59af8d75c274e800046c7530',
    description: 'parada LGBT',
  },
  {
    title: 'Somos a peça que faltava no seu negócio.',
    subtitle: 'Seja nosso parceiro e descubra as vantagens de ter seus eventos no melhor guia de entretenimento.',// eslint-disable-line
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/parceria.jpg`,
    url: '/quem-somos',
    description: 'quem somos',
  },
  {
    title: 'Saiba o que está rolando na cidade!',
    subtitle: 'Cadastre-se e fique por dentro das novidades!',
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/user.jpg`,
    url: '/cadastrar',
    description: 'cadastrar',
  },
  {
    title: 'Difícil divulgar seu evento em uma cidade grande como Salvador, não é?!',
    subtitle: 'Publique seu evento no melhor guia de eventos, é gratuito.',
    img: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/empresa.jpg`,
    url: '/',
    description: 'principal',
  },
];

export default banners;
