import express from 'express';
import { PORT } from './config';

const app = express();
app.use('/', express.static('public'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use((_, res) => {
  res.status(404).send('Not found.')
});
