const {MongoClient} = require('mongodb');
require('dotenv').config();

async function connectDB() {
    try {
      const uri = process.env.MONGODB_URI;
      console.log('Connecting to '+uri);
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      console.log('Connected to MongoDB');
      return db;
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {connectDB}