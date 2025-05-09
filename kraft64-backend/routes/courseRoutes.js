import express from 'express';
import { protect } from '../middleware/auth.js';
import Course from '../models/Course.js';

const router = express.Router();

// Create a new course (only trainers can add courses)
router.post('/add', protect, async (req, res) => {
  const { name, place, experience, proof, contact, fees, mode } = req.body;

  // Validate the incoming request body
  if (!name || !place || !experience || !contact || !fees || !mode) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  // Ensure the user is a trainer
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ msg: 'Only trainers can add courses' });
  }

  try {
    // Create the course
    const newCourse = new Course({
      name,
      place,
      experience,
      proof,
      contact,
      fees,
      mode,
      trainerId: req.user.id, // Linking the course to the logged-in trainer
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();
    res.status(201).json({
      msg: 'Course created successfully',
      course: savedCourse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get courses by trainer
router.get('/trainer/:trainerId', protect, async (req, res) => {
  try {
    // Ensure the requested trainerId matches the logged-in trainerId
    if (req.user.id !== req.params.trainerId) {
      return res.status(403).json({ msg: 'You are not authorized to view these courses' });
    }

    const courses = await Course.find({ trainerId: req.params.trainerId });
    if (!courses.length) {
      return res.status(404).json({ msg: 'No courses found for this trainer' });
    }
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
