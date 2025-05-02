import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User created successfully", user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } });
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
        name: user.fullName,
        email: user.email,
        avatar: user.avatar || '', // Optional
        bio: user.bio || ''
      }
    });
    
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
