import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnect = async () => {
  await client.connect();
  try {
    const db = client.db('holidayPlanner');
    return db;
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
