import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import sendgrid from 'sendgrid';
import fs from 'fs';

import MixpanelClient from './clients/mixpanel';

import config from './config';

const { PORT, SUPPORT_EMAIL, SENDGRID_API_KEY } = config;
const devMode = process.env.NODE_ENV !== 'production';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const helper = sendgrid.mail;
const sg = sendgrid(SENDGRID_API_KEY);

app.post('/send-email', (req, res) => {
  const { from, content } = req.body;

  return res.json({ ok: true });
});

  var fromEmail= new helper.Email('test@example.com');
  var toEmail = new helper.Email(SUPPORT_EMAIL);
  var subject = 'Mailing Test';
  var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

sg.API(request, function (error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
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

const assets = devMode
  ? { main: { js: 'main.js', css: 'style.css' }, vendor: { js: 'vendor.js' } }
  : JSON.parse(fs.readFileSync('assets.json'));

app.get('/termos-de-uso', (_, res) => {
  res.render('termos-de-uso.html', { assets });
});

app.get('*', (_, res) => { res.render('index.html', { assets }); });

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
