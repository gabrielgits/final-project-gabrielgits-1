// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5001;

// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Welcome' });
// });

// app.use('/users', usersRoutes);

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);

// });

//Zelalem
// const usersRoutes = require('./routes/users');
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const PORT = 3000;

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const { ObjectId, MongoClient } = require("mongodb");

app.use(express.json());
app.use(cors());

// let db;
let collection = null;
let COLLECTION_NAME = "users";
async function connectDB() {
  try {
    let uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("RN-Final-Project");
    collection = db.collection(COLLECTION_NAME);
    console.log("DB connected....");
  } catch (error) {
    console.log(error);
  }
}

connectDB();


// Add user
app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const result = await collection.insertOne(user);
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    console.error("Error creating a new user:", error);
    res
      .status(500)
      .send({ success: false, error: "Can not create a new user" });
  }
});


//add food 
app.put("/users/:userId/foods", async (req, res) => {
    try {
      const food = req.body;
      food._id = new ObjectId();
      const userId = req.params.userId;
  
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { foods: food } }
      );
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).send({ success: false, error: "Server error" });
    }
  });
  
  //edit food
  app.patch("/users/:userId/foods/:foodId", async (req, res) => {
    try {
      const { name, origin, price, date } = req.body;
      const userId = req.params.userId;
      const foodId = req.params.foodId;
  
      const result = await collection.updateOne(
        {
          _id: new ObjectId(userId),
          "foods._id": new ObjectId(foodId),
        },
        {
          $set: {
            "foods.$.name": name,
            "foods.$.origin": origin,
            "foods.$.price": price,
            "foods.$.date": date,
          }
        }
      );
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  });
  

//delete food
app.delete("/users/:userId/foods/:foodId", async (req, res) => {
    try {
      const result = await collection.updateOne(
        {
          _id: new ObjectId(req.params.userId)
        },
        { $pull: { foods: { _id: new ObjectId(req.params.foodId) } } }
      );
  
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  });
  

  //get all food 
  app.get("/users/:userId/foods", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
  
      const foods = user.foods || [];
  
      res.status(200).json({ success: true, data: foods });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  });
  '-----------------------------------------------------------------------------------------------'
// Add a daily note for a user
app.put("/users/:userId/notes", async (req, res) => {
    try {
      const note = req.body;
      note._id = new ObjectId();
      const userId = req.params.userId;
  
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { notes: note } }
      );
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).send({ success: false, error: "Server error" });
    }
  });
  
  
// Get all daily notes for a user
app.get("/users/:userId/notes", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
  
      const notes = user.notes || [];
  
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  // Update a daily note for a user
app.patch("/users/:userId/notes/:noteId", async (req, res) => {
    try {
      const { header, comment } = req.body;
      const userId = req.params.userId;
      const noteId = req.params.noteId;
  
      const result = await collection.updateOne(
        {
          _id: new ObjectId(userId),
          "notes._id": new ObjectId(noteId),
        },
        {
          $set: {
            "notes.$.header": header,
            "notes.$.comment": comment,
          }
        }
);
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
});
// Delete a daily note for a user
app.delete("/users/:userId/notes/:noteId", async (req, res) => {
    try {
      const result = await collection.updateOne(
        {
          _id: new ObjectId(req.params.userId),
        },
        { $pull: { notes: { _id: new ObjectId(req.params.noteId) } }}
      );
  
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  });
  '-------------------------------------------------------------------------------'

  app.put("/users/:userId/orders", async (req, res) => {
    try {
      const order = req.body;
      order._id = new ObjectId();
      const userId = req.params.userId;
  
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { orders: order } }
      );
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).send({ success: false, error: "Server error" });
    }
  });
  
  app.patch("/users/:userId/orders/:orderId", async (req, res) => {
    try {
      const { customerName, orderItem, price } = req.body;
      const userId = req.params.userId;
      const orderId = req.params.orderId; 
      
      const result = await collection.updateOne(
        {
          _id: new ObjectId(userId),
          "orders._id": new ObjectId(orderId), 
        },
        {
          $set: {
            "orders.$.customerName": customerName,
            "orders.$.orderItem": orderItem,
            "orders.$.price": price,
          }
        }
      );
      res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  });
  
app.listen(PORT, () => console.log("Server connected...."));
