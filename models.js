import dbConnect from './database.js';

const get = async () => {
  const db = await dbConnect();
  const collection = db.collection('test');
  return await collection.find().toArray();
};

export { get };
