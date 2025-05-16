import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
  userId: String,
  username: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});
export default mongoose.model('Activity', activitySchema);
