import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if token is provided in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID and attach to request object
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }

      // Attach user to request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error(err);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};
