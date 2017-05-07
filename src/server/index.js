import express from 'express';
import nunjucks from 'nunjucks';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import mixpanel from '~/src/toakee-core/apis/mixpanel';

import config from './config';

const { PORT, SUPPORT_EMAIL } = config;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/events/*', (req, res) => {
  var success;

  if(req.body.name && req.body.props) {
    if(req.path === '/events/track') {
      mixpanel.track(req.body.name, req.body.props);
      success = 'Mixpanel Track';
    } else if(req.path === '/events/alias') {
      mixpanel.alias(req.body.name, req.body.props);
      success = 'Mixpanel Alias';
    }
  } else if(req.body.name) {
    if(req.path === '/events/time') {
      mixpanel.time(req.body.name);
      success = 'Mixpanel Time';
    }
  } else if(req.body.props) {
    if(req.path === '/events/set-people') {
      mixpanel.setPeople(req.body.props);
      success = 'Mixpanel Set People';
    } else if(req.path === "/events/update-people") {
      mixpanel.updatePeople(req.body.props);
      success = 'Mixpanel Update People';
    }
  }

  return success ? res.json({ success: true, message: success })
                 : res.json({ success: false });
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
