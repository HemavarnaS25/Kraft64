import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
    },
    place: {
      type: String,
      required: [true, 'Place is required'],
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
    },
    proof: {
      type: String, // Optional field for proof, can be a URL or reference link
      default: '',   // Default to an empty string if not provided
    },
    contact: {
      type: String,
      required: [true, 'Contact information is required'],
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'],  // Email validation example
    },
    fees: {
      type: Number,
      required: [true, 'Fees are required'],
      min: [0, 'Fees cannot be less than 0'], // Prevent negative fee values
    },
    mode: {
      type: String,
      required: [true, 'Mode of learning is required'],
      enum: ['Online', 'Offline', 'Hybrid'], // Ensures that only these values are allowed
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer ID is required'],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
