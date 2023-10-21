const { MongoClient } = require('mongodb');
require('dotenv').config();

var db = null;
async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to ' + uri);
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.log(error);
  }
}
const initiDb = async () => {
 await connectDB();
}
initiDb();

module.exports = { connectDB, db }
