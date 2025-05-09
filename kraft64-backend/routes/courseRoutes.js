import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Create a new course (only trainers can add courses)
router.post('/add', protect, async (req, res) => {
  const { name, place, experience, proof, contact, fees, mode } = req.body;

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
      course: savedCourse
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get courses by trainer
router.get('/trainer/:trainerId', protect, async (req, res) => {
  try {
    const courses = await Course.find({ trainerId: req.params.trainerId });
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
