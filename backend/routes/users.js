const express = require('express');
const { connectDB } = require('../data/mongodb');
const {ObjectId} = require('mongodb');
const router = express.Router();


let db = null;

const initiDb = async () => {
  db = await connectDB();
}

initiDb();

const COLLECTION_NAME = 'users';


// Add user
router.post("/", async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;
    if (!name || !phone || !address || !email || !password) {
      return res.status(400).json({ success: false, error: 'name, phone, address, email and password are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).insertOne({ name, phone, address, email, password });
    res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get User
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update User
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) {
      return res.status(400).json({ success: false, error: 'name, phone, email and address are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(userId) },
      { $set: { name, phone, email, password } }
    );
    res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Update User Password
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, error: 'password is required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password } }
    );
    res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// CRUD Food (name, price, date, image)

// Add Food
router.post("/:userId/foods", async (req, res) => {
  try {
    const {name, origin, price, date, image} = req.body;
    const _id = new ObjectId();
    const userId = req.params.userId;
    if (!name || !origin || !price || !date || !image) {
      return res.status(400).json({ success: false, error: 'name, origin, price, date and image are required.' });
    }
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(userId) },
        { $push: { foods: { _id, name, origin, price, date, image } } }
      );
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
})

// Get Foods
router.get("/:userId/foods", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const foods = user.foods || [];

    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Food by Id
router.get("/:userId/foods/:foodId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const foodId = req.params.foodId;
    const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const food = user.foods.find(food => food._id.toString() === foodId);
    if (!food) {
      return res.status(404).json({ success: false, error: "Food not found" });
    }

    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Food
router.delete("/:userId/foods/:foodId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const foodId = req.params.foodId;
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { foods: { _id: new ObjectId(foodId) } } }
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Edit Food
router.put("/:userId/foods/:foodId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const foodId = req.params.foodId;
    const { name, origin, price, date } = req.body;
    const result = await db.collection(COLLECTION_NAME).updateOne(
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
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CRUD (header, date, comment)

// Add Note
router.post("/:userId/notes", async (req, res) => {
  try {
    const { header, comment } = req.body;
    const userId = req.params.userId;
    if (!header || !comment) {
      return res.status(400).json({ success: false, error: 'header and comment are required.' });
    }
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(userId) },
        { $push: { notes: { _id: new ObjectId(), header, comment, notedate : new Date() } } }
      );
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Get Notes
router.get("/:userId/notes", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const notes = user.notes || [];

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Note by Id
router.get("/:userId/notes/:noteId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const note = user.notes.find((note) => note._id.toString() === noteId);

    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Note
router.delete("/:userId/notes/:noteId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { notes: { _id: new ObjectId(noteId) } } }
    );

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// CRUD order (customer, date, foods, orderstatus)
// Add Order
router.post("/:userId/orders", async (req, res) => {
  try {
    const { customer } = req.body;
    const userId = req.params.userId;
    if (!customer) {
      return res.status(400).json({ success: false, error: 'customer is required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(userId) },
      { $push: { orders: { _id: new ObjectId(), customer, orderdate : new Date(), orderstatus : "pending" } } }
    );
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }

})

//Add Foods to Order
// Add Foods to Order
router.put("/:userId/orders/:orderId/foods", async (req, res) => {
  try {
    const { foods } = req.body;
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    const result = await db.collection(COLLECTION_NAME).updateOne(
      {
        _id: new ObjectId(userId),
        "orders._id": new ObjectId(orderId),
      },
      { $push: { "orders.$.foods": { $each: foods } } }
    );

    // change order status
    result = await db.collection(COLLECTION_NAME).updateOne(
      {
        _id: new ObjectId(userId),
        "orders._id": new ObjectId(orderId),
      },
      { $set: { "orders.$.orderstatus": "completed" } }
    );

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;
