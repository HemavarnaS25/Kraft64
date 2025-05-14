import Course from '../models/Course.js';
import User from '../models/User.js';

export const addCourse = async (req, res) => {
  try {
    const { name, place, experience, proof, contact, fees, mode, trainerId } = req.body;

    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ msg: 'Trainer not found' });
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
      trainerName: trainer.name // ✅ Save trainer name
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error('Add course error:', err);
    res.status(500).json({ msg: 'Server error while adding course' });
  }
};

export const getCoursesByTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const courses = await Course.find({ trainerId });
    res.json(courses);
  } catch (err) {
    console.error('Get courses error:', err);
    res.status(500).json({ msg: 'Server error fetching courses' });
  }
};
