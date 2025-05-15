// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    place: { type: String, required: true },
    experience: { type: String, required: true },
    proof: { type: String },
    contact: { type: String, required: true },
    fees: { type: Number, required: true },
    mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        dateJoined: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
