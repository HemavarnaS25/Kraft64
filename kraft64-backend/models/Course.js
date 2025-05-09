// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  mode: { type: String, required: true },
  fees: { type: Number, required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  experience: { type: String, required: true },
  proof: { type: String, required: false },
  contact: { type: String, required: true }
});

const Course = mongoose.model('Course', courseSchema);

export default Course; // Ensure this is a default export
