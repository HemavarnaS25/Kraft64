import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if token is provided in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user details, including trainer information
      const user = await User.findById(decoded.id).select('fullName role email');

      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }

      // If user is a trainer, attach trainer info
      req.user = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      };

      next(); // Proceed to next middleware or route handler
    } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ msg: 'Not authorized, no token provided' });
  }
};
