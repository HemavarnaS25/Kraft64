import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// @route   POST /api/courses/add
// @desc    Add a new course
router.post('/add', async (req, res) => {
  try {
    const { name, place, experience, proof, contact, fees, mode, trainerId } = req.body;

    if (!name || !place || !experience || !contact || !fees || !mode || !trainerId) {
      return res.status(400).json({ msg: 'All required fields must be filled.' });
    }

    const newCourse = new Course({
      name,
      place,
      experience,
      proof,
      contact,
      fees,
      mode,
      trainerId,
    });

    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error in /add:', error);
    res.status(500).json({ msg: 'Server error while adding course.' });
  }
});

// @route   GET /api/courses/trainer/:trainerId
// @desc    Get all courses for a specific trainer
router.get('/trainer/:trainerId', async (req, res) => {
  try {
    const courses = await Course.find({ trainerId: req.params.trainerId }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error in /trainer/:trainerId:', error);
    res.status(500).json({ msg: 'Server error while fetching courses.' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find().populate('trainerId', 'name email');
    res.json(courses);
  } catch (error) {
    console.error('Error in /all:', error);
    res.status(500).json({ msg: 'Server error while fetching all courses.' });
  }
});

export default router;
