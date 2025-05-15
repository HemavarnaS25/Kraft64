import Course from '../models/Course.js';
import User from '../models/User.js';

// Add a new course with trainer details
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
      trainerName: trainer.fullName, // ✅ Store trainer's name correctly
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ msg: 'Server error while adding course' });
  }
};

// Get courses by trainer
export const getCoursesByTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const courses = await Course.find({ trainerId }).populate('students.studentId', 'fullName email');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ msg: 'Server error fetching courses' });
  }
};

// Enroll student in a course
export const enrollStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    const course = await Course.findById(req.params.courseId);
    const student = await User.findById(studentId);

    if (!course) return res.status(404).json({ msg: 'Course not found' });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Add student to course
    course.students.push({ studentId, name: student.fullName, email: student.email });
    await course.save();

    res.status(200).json({ msg: 'Successfully enrolled', student: student.fullName, course: course.name });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ msg: 'Server error while enrolling student' });
  }
};
