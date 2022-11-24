import { ObjectId } from 'mongodb';
import dbConnect from './database.js';

const get = async () => {
  const db = await dbConnect();
  const collection = db.collection('users');
  return await collection.find().toArray();
};

const updateFavorites = async (userEmail, siteData) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne({ email: userEmail }, { $addToSet: { favorites: siteData } });
    return await collection.findOne({ email: userEmail }, {});
  }
  catch {
    throw new Error('Id was not found')
  }
};

const getFavorites = async userEmail => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    const result = await collection.findOne({ email: userEmail }, {});
    return result.favorites;
  }
  catch {
    throw new Error('Id was not found')
  }
};

const deleteOneFavorite = async (userEmail, siteId) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne({ email: userEmail }, { $pull: { favorites: { siteId: siteId  }} });
    const result = await collection.findOne({ email: userEmail }, {});
    return result.favorites;
  } catch(e) {
    console.error(e)
  }
};

const createUser = async (user) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    const userExists = await collection.findOne({ email: user.email });
    const dbUser = {
      ...user,
      favorites: [],
      lists: [],
    };

    !userExists && await collection.insertOne(dbUser);
    return
  } catch(e) {
    console.error(e)
  }
};

const findUser = async (user) => {
  try{
    const db = await dbConnect();
    const collection = db.collection('users');
    return await collection.findOne({ email: user.email });
  } catch(e) {
    console.error(e)
  }
};

export {
  get,
  updateFavorites,
  getFavorites,
  deleteOneFavorite,
  createUser,
  findUser
};
