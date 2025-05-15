import Course from '../models/Course.js';
import User from '../models/User.js';

// Get all courses with trainer & students populated
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('trainerId', 'fullName email') // ✅ Fetch trainer details
      .populate('students.studentId', 'fullName email'); // ✅ Fetch enrolled student details

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ msg: 'Server error while fetching courses.' });
  }
};

// Enroll student in a course using studentId
export const enrollStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    const course = await Course.findById(req.params.courseId);
    const student = await User.findById(studentId);

    if (!course) return res.status(404).json({ msg: 'Course not found' });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Add student reference
    course.students.push({ studentId, name: student.fullName, email: student.email });
    await course.save();

    res.status(200).json({ msg: 'Successfully enrolled in course!', student: student.fullName });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ msg: 'Server error while enrolling student.' });
  }
};

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
      trainerName: trainer.fullName, // ✅ Store trainer’s name correctly
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error('Add course error:', err);
    res.status(500).json({ msg: 'Server error while adding course' });
  }
};

// Export functions correctly
export { addCourse, getAllCourses, enrollStudent };
