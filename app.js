import express from 'express';
import cors from 'cors';
import * as path from 'path';
import {
  updateFavorites,
  getFavorites,
  deleteOneFavorite,
  findUser,
  addToList,
  getLists,
  deleteFromList,
  deleteList
} from './models.js';
import { fileURLToPath } from 'url';
import { getRadius, getWiki } from './opentrip.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
};

app.get('/api/search/:query', async (req, res) => {
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

app.patch('/api/favorites', async (req, res) => {
  try {
    const data = await updateFavorites(req.body.email, req.body.siteData);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});

app.get('/api/list/favorites', async (req, res) => {
  try {
    const data = await getFavorites(req.query.email);
    res.json(data);
  } catch(e) {
    console.error(e);
  }
});

app.patch('/api/list/favorites', async (req, res) => {
  try {
    const data = await deleteOneFavorite(req.body.email, req.body.id);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});

app.patch('/api/lists/:listName', async (req, res) => {
  try {
    const data = await addToList(req.body.email, req.body.siteData);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});

app.delete('/api/lists/:listName', async (req, res) => {
  try {
    await deleteList(req.body.email, req.body.listName);
    res.json();
  } catch(e) {
    console.error(e)
  }
});

app.patch('/api/lists/listName/:id', async (req, res) => {
  try {
    await deleteFromList(req.body.email, req.body.list, req.body.id);
    res.json();
  } catch(e) {
    console.error(e)
  }
});

app.get('/api/lists', async (req, res) => {
  try {
    const data = await getLists(req.query.email);
    res.json(data);
  } catch(e) {
    console.error(e)
  }
});

app.post("/api/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = findUser(profile);

      if (!existsInDB) {
        return res.status(400).json({
          message: 'You are not registered. Please sign up',
        });
      }

      res.status(201).json({
        message: 'Login was successful',
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, 'mySecret', {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});


if (process.env.NODE_ENV === 'production') {
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}

export default app;
