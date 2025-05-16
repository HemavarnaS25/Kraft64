import express from 'express';
import Activity from '../models/Activity.js';
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const saved = await activity.save();
    req.io.emit('activity', saved); 
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(20);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
