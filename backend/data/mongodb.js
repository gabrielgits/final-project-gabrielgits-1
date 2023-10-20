// const {MongoClient} = require('mongodb');
// require('dotenv').config();

// async function connectDB() {
//     try {
//       const uri = process.env.MONGODB_URI;
//       console.log('Connecting to '+uri);
//       const client = new MongoClient(uri);
//       await client.connect();
//       const db = client.db(process.env.DB_NAME);
//       console.log('Connected to MongoDB');
//       return db;
//     } catch (error) {
//       console.log(error);
//     }
//   }

// module.exports = {connectDB}

// const { MongoClient } = require("mongodb");
// let collection = null;
// let COLLECTION_NAME = "users";
// async function connectDB() {
//   try {
//     let uri = "mongodb://127.0.0.1:27017";
//     const client = new MongoClient(uri);
//     await client.connect();
//     const db = client.db("RN-Final-Project");
//     collection = db.collection(COLLECTION_NAME);
//     console.log("DB connected....");
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = { connectDB };

// const { MongoClient } = require("mongodb");

// let collection = null;
// let COLLECTION_NAME = "users";
// let db = null;

// async function connectDB() {
//   try {
//     let uri = "mongodb://127.0.0.1:27017";
//     const client = new MongoClient(uri);
//     await client.connect();
//     const database = client.db("RN-Final-Project");
//     collection = database.collection(COLLECTION_NAME);
//     console.log("DB connected....");
//     return database;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// module.exports = { connectDB };
