const devMode = process.env.NODE_ENV !== 'production';

export default {
  RP_TIMEOUT: 5000,
  SOCIAL_REDIRECT_URI: '/social-login',
  GRAPHQL_URI: devMode
    ? 'http://localhost:4000'
    : 'https://graphql-api.herokuapp.com',
  ASSETS_CLOUD_NAME: 'toakeeassets',
  ASSETS_API_KEY: '298788132128547',
  ASSETS_API_SECRET: 'bqbBB0MoXpi-CYWbKKIneqRtVAk',
  ASSETS_BASE_URI: 'http://res.cloudinary.com/toakeeassets/image/upload/s--Ug65JuU_--/v1494199755',
  FACEBOOK_APP_ID: '1848071472114729',
  INSTAGRAM_APP_ID: 'e054e2eab38043d78abd577d5800d994',
  RECAPTCHA_SITE_KEY: '6LcbbxsUAAAAAEpNul2MOigAfpvpWVF0hN_ZMfBj',
  MIXPANEL_TOKEN: devMode
    ? '7b57fa79fe746a43e479aa0f416d9e23'
    : '4de036ffde489bc4ecdc1e03498aab2b',
};
