import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { get, updateFavorites, getFavorites, deleteOneFavorite } from './models.js';
import { fileURLToPath } from 'url';
import { getRadius, getWiki } from './opentrip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

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

const userID = '637e20cc974a8ad518c65a98';

app.patch('/api/favorites', async (req, res) => {
  try {
    const data = await updateFavorites(userID, req.body);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});

app.get('/api/list/favorites', async (req, res) => {
  try {
    const data = await getFavorites(userID);
    res.json(data);
  } catch(e) {
    console.error(e);
  }
});

app.patch('/api/list/favorites', async (req, res) => {
  try {
    const data = await deleteOneFavorite(userID, req.body.id);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});
  // res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
    // app.use(express.static('client/build'));
  });
}

export default app;
