// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ msg: "Email already in use" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ msg: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      msg: "User created successfully",
      user: { id: newUser._id, username: newUser.username, fullName: newUser.fullName, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        name: user.fullName,
        email: user.email,
        bio: user.bio || ''
      }
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// controllers/authController.js
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, bio }, // no username here
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });

    res.json({
      msg: 'Profile updated',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        name: updatedUser.fullName,
        email: updatedUser.email,
        bio: updatedUser.bio
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error updating profile' });
  }
};

