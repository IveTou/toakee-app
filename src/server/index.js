import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import fs from 'fs';
import GooglePlaces from 'node-googleplaces';
import cookieParser from 'cookie-parser';

import MixpanelClient from './clients/mixpanel';

import config from './config';
import { exposeSSRRoutes } from './ssr';

const { PORT, GOOGLE_PLACES_KEY } = config;
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
  res.setHeader('Content-Ecoding', 'gzip');
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
  res.header('Content-Type', 'application/xml');
  res.render('sitemap.xml');
});

const assets = devMode
  ? { main: { js: 'main.js', css: 'style.css' }, vendor: { js: 'vendor.js' } }
  : JSON.parse(fs.readFileSync('assets.json'));

exposeSSRRoutes(app, assets);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
