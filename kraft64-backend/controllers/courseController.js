import Course from '../models/Course.js';

export const addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error('Error saving course:', err);
    res.status(500).json({ msg: 'Server error, could not save course.' });
  }
};
