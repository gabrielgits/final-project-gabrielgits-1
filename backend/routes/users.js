const express = require('express');
const {ObjectId} = require('mongodb');
const {connectDB} = require('../data/mongodb');

const router = express.Router();

let db = null;

const initiDb = async () => {
  db = await connectDB();
}

initiDb();

const COLLECTION_NAME = 'users';


// Add department
router.post('/', async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ success: false, error: 'name and code are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).insertOne({ name, code});
    res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get department
router.get('/', async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).find().toArray();
    res.json({ success: true, data: result[0] });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// Add course to department
router.post('/:departmentId/courses', async (req, res) => {
  try {
    const { title, code, faculty, rating } = req.body;
    if (!title || !code || !faculty) {
      return res.status(400).json({ success: false, error: 'title, code, faculty and rating are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.departmentId) },
      { $push: { courses: { _id: new ObjectId(), title, code, faculty, rating } } }
    ); 
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get all courses from department
router.get('/:departmentId/courses', async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).find({ _id: new ObjectId(req.params.departmentId) }).toArray();
    res.json({ success: true, data: result[0].courses });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Delete course from department
router.delete('/:departmentId/courses/:courseId', async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.departmentId) },
      { $pull: { courses: { _id: new ObjectId(req.params.courseId) } } }
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// update course from department
router.put('/:departmentId/courses/:courseId', async (req, res) => {
  try {
    const { title, code, faculty, rating } = req.body;
    if (!title || !code || !faculty || !rating) {
      return res.status(400).json({ success: false, error: 'title, code, faculty and rating are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.departmentId), 'courses._id': new ObjectId(req.params.courseId) },
      { $set: { 'courses.$.title': title, 'courses.$.code': code, 'courses.$.faculty': faculty, 'courses.$.rating': rating } }

    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// add review to course
router.post('/:departmentId/courses/:courseId/reviews', async (req, res) => {
  try {
    const { name,comment, rating } = req.body;
    if (!name || !comment || !rating) {
      return res.status(400).json({ success: false, error: 'name, comment and rating are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.departmentId), 'courses._id': new ObjectId(req.params.courseId) },
      { $push: { 'courses.$.reviews': { _id: new ObjectId(), name, comment, rating } } }
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// Get all reviews from course
router.get('/:departmentId/courses/:courseId/reviews', async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).findOne(
      { _id: new ObjectId(req.params.departmentId), 'courses._id': new ObjectId(req.params.courseId) },
      { 'courses.$': 1 }
    );
    const reviews = result.courses[0].reviews;
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// delete review from course
router.delete('/:departmentId/courses/:courseId/reviews/:reviewId', async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.departmentId), 'courses._id': new ObjectId(req.params.courseId) },
      { $pull: { 'courses.$.reviews': { _id: new ObjectId(req.params.reviewId) } } }
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

// update review from course
router.put('/:departmentId/courses/:courseId/reviews/:reviewId', async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    if (!name || !comment || !rating) {
      return res.status(400).json({ success: false, error: 'name, comment and rating are required.' });
    }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.departmentId), 'courses._id': new ObjectId(req.params.courseId) },
      { $set: { 'courses.$.reviews': { _id: new ObjectId(req.params.reviewId), name, comment, rating } } }
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

module.exports = router;
