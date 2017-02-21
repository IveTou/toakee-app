import express from 'express';
import nunjucks from 'nunjucks';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

import { PORT, SUPPORT_EMAIL } from './config';

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

app.get('*', (_, res) => { res.render('index.html'); });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
