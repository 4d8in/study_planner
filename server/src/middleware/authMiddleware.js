const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authMiddleware(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' ');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const payload = jwt.verify(token, env.tokenSecret);
      if (requiredRole && payload.role !== requiredRole) return res.status(403).json({ message: 'Forbidden' });
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = authMiddleware;
