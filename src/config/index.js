const devMode = process.env.NODE_ENV !== 'production';

export default {
  RP_TIMEOUT: 5000,
  SOCIAL_REDIRECT_URI: '/social-login',
  GRAPHQL_URI: devMode
    ? 'http://localhost:4000/graphql'
    : 'https://graphql-api.herokuapp.com/graphql',
  UPLOAD_BANNER_PRESET: 'event-flyer',
  UPLOAD_URL: 'https://api.cloudinary.com/v1_1/toakeeassets/upload',
  ASSETS_BASE_URI: 'http://res.cloudinary.com/toakeeassets/image/upload/s--Ug65JuU_--/v1494199755',
  FACEBOOK_PAGE_URI: 'https://www.facebook.com/eutoakee/',
  ASSETS_BANNERS_PATH: 'core/site/banners',
  FACEBOOK_APP_ID: '1848071472114729',
  INSTAGRAM_APP_ID: 'e054e2eab38043d78abd577d5800d994',
  RECAPTCHA_SITE_KEY: '6LcbbxsUAAAAAEpNul2MOigAfpvpWVF0hN_ZMfBj',
  MIXPANEL_TOKEN: devMode
    ? '7b57fa79fe746a43e479aa0f416d9e23'
    : '4de036ffde489bc4ecdc1e03498aab2b',
};
