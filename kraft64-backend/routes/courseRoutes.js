import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { addCourse, getCoursesByTrainer } from '../controllers/courseController.js';

const router = express.Router();

// @route   POST /api/courses/add
// @desc    Add a new course
router.post('/add', addCourse);

// @route   GET /api/courses/trainer/:trainerId
// @desc    Get all courses for a specific trainer
router.get('/trainer/:trainerId', getCoursesByTrainer);

// @route   GET /api/courses/all
// @desc    Get all courses with trainer details
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ msg: 'Server error while fetching courses.' });
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

export default router;
