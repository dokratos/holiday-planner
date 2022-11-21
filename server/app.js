import express from 'express';
import cors from 'cors';
import { get } from './models.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const data = await get();
  res.json(data);
});

export default app;