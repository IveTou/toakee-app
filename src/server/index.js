import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import sendgrid from 'sendgrid';
import fs from 'fs';
import GooglePlaces from 'node-googleplaces';
import cookieParser from 'cookie-parser';
import sitemap from 'sitemap';

import MixpanelClient from './clients/mixpanel';

import config from './config';
import { exposeSSRRoutes } from './ssr';

const { PORT, SUPPORT_EMAIL, SENDGRID_API_KEY, GOOGLE_PLACES_KEY } = config;
const devMode = process.env.NODE_ENV !== 'production';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const aWeek = 1000 * 60 * 60 * 24 * 7;
const staticOptions = devMode ? {} : { maxage: aWeek };
app.use(express.static('public', staticOptions));

const whiteList = ['toakee.com', 'toakee.com.br'];
app.use((req, res, next) => {
  if (whiteList.some(host => req.headers.host.includes(host))) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.host);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app,
});

const placesApi = new GooglePlaces(GOOGLE_PLACES_KEY);

app.get('/gapi/predict', (req, res) => {
  const { input } = req.query;
  placesApi.queryAutocomplete({ input }, (_, { body }) => res.json(body));
});

const helper = sendgrid.mail;
const sg = sendgrid(SENDGRID_API_KEY);

app.post('/send-email', (req, res) => {
  const { from, name, message, subscribe } = req.body;

  const mailBody = subscribe ?
    `<h2>Inscrever-se</h2><p>${message}</p>` :
    `<h2>Não Inscrever-se</h2><p>${message}</p>`;

  const fromEmail = new helper.Email(from, name);
  const toEmail = new helper.Email(SUPPORT_EMAIL);
  const subject = 'Customer Contact';
  const content = new helper.Content('text/html', mailBody);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, (_, { statusCode }) => res.json({ ok: statusCode === '202' }));
});

app.post('/events/track', (req, res) => {
  if (req.body.name && req.body.props) {
    MixpanelClient.track(req.body.name, req.body.props);
  }
  return res.json({ ok: true });
});

app.get('/social-login', (_, res) => {
  res.render('social-login.html');
});


app.get('/sitemap.xml', (req, res) => {
  sitemap.createSitemap({
    hostname: req.headers.host,
    cacheTime: 600000,
    urls: [
      {
        url: '/landing/',
        changefreq: 'weekly',
        priority: 0.7,
        img: `${config.ASSETS_BASE_URI}/core/site/brand.png`,
      },
      { url: '/evento/', changefreq: 'daily', priority: 0.9 },
    ],
  })
  .toXML((err, xml) => {
    if (!err) {
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    }
  });
});

const assets = devMode
  ? { main: { js: 'main.js', css: 'style.css' }, vendor: { js: 'vendor.js' } }
  : JSON.parse(fs.readFileSync('assets.json'));

exposeSSRRoutes(app, assets);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
