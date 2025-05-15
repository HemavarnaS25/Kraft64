import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const { userId } = req.body; // Assuming user ID is passed in request body

  if (!userId) {
    return res.status(401).json({ msg: 'Not authorized, user ID required' });
  }

  try {
    // Fetch user details by ID
    const user = await User.findById(userId).select('fullName role email');

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Attach user details to request object
    req.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    };

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('User authentication error:', err);
    res.status(500).json({ msg: 'Server error while authenticating user' });
  }
};
