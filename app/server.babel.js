import express from 'express';
import { fromEnv } from './config';

const app = express();
app.use('/',express.static('public'))

const PORT = fromEnv('PORT');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})
