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
// @route   POST /api/courses/join/:courseId
// @desc    Add a student to a course
router.post('/join/:courseId', async (req, res) => {
  try {
    const { name, email } = req.body;
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course.students.push({ name, email });

    await course.save();

    res.status(200).json({ msg: 'Successfully joined the course!' });
  } catch (error) {
    console.error('Error in /join/:courseId:', error);
    res.status(500).json({ msg: 'Server error while joining the course.' });
  }
});
// @route   GET /api/courses/all
// @desc    Get all courses with trainer details populated
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('trainerId', 'name')  // Populate the trainer name (you can also add other fields if needed)
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ msg: 'Server error while fetching courses.' });
  }
});



export default router;
