import express from 'express';
import nunjucks from 'nunjucks';
import { PORT } from './config';

const app = express();
app.use(express.static('public'));

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app,
});

app.get('*', (_, res) => { res.render('index.html'); });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
