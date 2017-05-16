import express from 'express';
import nunjucks from 'nunjucks';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

import MixpanelClient from './clients/mixpanel';

import config from './config';

const { PORT, SUPPORT_EMAIL } = config;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const hosts = ['toakee.com', 'toakee.com.br'];
  for (let i = 0; i < hosts.length; i += 1) {
    if (req.headers.host.indexOf(hosts[i]) > -1) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.host);
    }
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

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pkgo.red@gmail.com',
    pass: 'pikachu12345',
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, body: text } = req.body;
  const from = `${name} <${email}>`;

  transporter.sendMail({ to: SUPPORT_EMAIL, from, subject, text });
  transporter.close();

  return res.json({ ok: true });
});

app.post('/events/track', (req, res) => {
  if (req.body.name && req.body.props) {
    MixpanelClient.track(req.body.name, req.body.props);
  }
  return res.json({ ok: true });
});

app.get('/termos-de-uso', (_, res) => {
  res.render('termos-de-uso.html');
});

app.get('/social-login', (_, res) => {
  res.render('social-login.html');
});

app.get('*', (_, res) => { res.render('index.html'); });

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
