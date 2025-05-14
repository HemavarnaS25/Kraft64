import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  xLink: { type: String, default: '' },
  role: {
    type: String,
    enum: ['student', 'trainer'], // Only student and trainer allowed
    required: true,
    lowercase: true, // Automatically convert input to lowercase
    trim: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;