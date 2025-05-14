import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    const {
      name,
      place,
      experience,
      proof,
      contact,
      fees,
      mode,
      trainerId,
      trainerName,
      students
    } = req.body;

    const newCourse = new Course({
      name,
      place,
      experience,
      proof,
      contact,
      fees,
      mode,
      trainerId,
      trainerName,
      students
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    console.error(error);  // See what the error is
    res.status(500).json({ message: 'Failed to add course', error });
  }
};
