import express from 'express';
import nunjucks from 'nunjucks';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

import { PORT } from './config';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ivessauro@gmail.com',
    pass: 'mr.and310390',
  },
});

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app,
});

app.post('/send-email', (req, res) => {
  const { email: from, phone, body: text } = req.body;

  transporter.sendMail({
    from,
    to: 'support@toakee.com',
    subject: 'Contato',
    text,
  });
  transporter.close();

  res.redirect('/');
});

app.get('*', (_, res) => { res.render('index.html') });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
