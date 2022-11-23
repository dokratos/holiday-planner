import { ObjectId } from 'mongodb';
import dbConnect from './database.js';

const get = async () => {
  const db = await dbConnect();
  const collection = db.collection('users');
  return await collection.find().toArray();
};

const updateFavorites = async (userID, siteData) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne({ _id: ObjectId(userID) }, { $addToSet: { favorites: siteData } });
    return await collection.findOne({ _id: ObjectId(userID) });
  }
  catch {
    throw new Error('Id was not found')
  }
}

const getFavorites = async userID => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    const result = await collection.findOne({ _id: ObjectId(userID) });
    return result.favorites;
  }
  catch {
    throw new Error('Id was not found')
  }
}

const deleteOneFavorite = async (userID, siteId) => {
  try{
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne({ _id: ObjectId(userID) }, { $pull: { favorites: { siteId: siteId  }} });
    const result = await collection.findOne({ _id: ObjectId(userID) });
    return result.favorites;
  } catch(e) {
    console.error(e)
  }
}

export { get, updateFavorites, getFavorites, deleteOneFavorite };
