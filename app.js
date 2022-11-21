import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { get } from './models.js';
import { fileURLToPath } from 'url';
import getRadius from './opentrip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.get('/', async (req, res) => {
  const data = await get();
  res.json(data);
});

app.get('/something', async (req, res) => {
  const data = await getRadius('london');
  res.json(data);
});

export default app;