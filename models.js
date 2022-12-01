import dbConnect from './database.js';
import { getCityImage } from './opentrip.js';

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
    throw new Error('User was not found')
  }
};

const deleteOneFavorite = async (userEmail, siteId) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne({ email: userEmail }, { $pull: { favorites: { siteId: siteId }} });
    const result = await collection.findOne({ email: userEmail }, {});
    return result.favorites;
  } catch(e) {
    console.error(e)
  }
};

const addToList = async (userEmail, siteData) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    const user =  await collection.findOne({ "email": userEmail, "lists.listName": siteData.city });
    
    if(!user) {
      const image = await getCityImage(siteData.city);
      await collection.updateOne({ email: userEmail }, { $addToSet: { lists: { listName: siteData.city, image }} });
    };
    
    await collection.updateOne(
      { "email": userEmail, "lists.listName": siteData.city }, 
      { "$addToSet": { "lists.$.sites": siteData} }
    );

    const result = await collection.findOne({ email: userEmail }, {});
    return result.favorites;
  } catch(e) {
    console.error(e)
  }
}

const deleteFromList = async (email, list, id) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne(
      { "email": email, "lists.listName": list }, 
      { "$pull": { "lists.$.sites": {siteId: id}} })
    return;
  } catch(e) {
    console.error(e)
  }
}

const deleteList = async (email, listName) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    await collection.updateOne(
      { "email": email }, 
      { "$pull": { "lists": {listName: listName}} })
    return;
  } catch(e) {
    console.error(e)
  }
}

const getLists = async (userEmail) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    const user =  await collection.findOne({ 'email': userEmail }, {});
    return user.lists;
  } catch(e) {
    console.error(e)
  }
}

const createUser = async (user) => {
  try {
    const db = await dbConnect();
    const collection = db.collection('users');
    const dbUser = {
      ...user,
      favorites: [],
      lists: [],
    };
    return await collection.insertOne(dbUser);
  } catch(e) {
    console.error(e)
  }
};

const findUser = async (user) => {
  try{
    const db = await dbConnect();
    const collection = db.collection('users');
    const userExists = await collection.findOne({ email: user.email });
    if (!userExists) {
      createUser(user)
    }
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
  findUser,
  addToList,
  getLists,
  deleteFromList,
  deleteList
};
