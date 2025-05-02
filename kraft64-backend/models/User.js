import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    data: Buffer,
    contentType: String
},       
  bio: { type: String },      
});
export default mongoose.model('User', userSchema);
