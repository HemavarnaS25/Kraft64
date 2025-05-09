import Course from '../models/Course.js';
export const getCoursesByTrainer = async (req, res) => {
  const { trainerId } = req.params;
  try {
    const courses = await Course.find({ trainerId });
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ msg: 'Could not fetch courses' });
  }
};
