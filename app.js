import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { get } from './models.js';
import { fileURLToPath } from 'url';
import { getRadius, getWiki } from './opentrip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/public/index.html"));

//   // res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.get('/', async (req, res) => {
  const data = await get();
  res.json(data);
});

app.get('/api/:query', async (req, res) => {
  const city = req.params.query;
  const data = await getRadius(city);
  res.json(data);
});

app.get('/api/sites/:id', async (req, res) => {
  try {
    const id = req.params;
    const data = await getWiki(id);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});

export default app;
