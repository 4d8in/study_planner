const env = require('../config/env');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');

  if (!token || token !== env.tokenSecret) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = { email: env.demoUser }; // simple simulated user
  next();
}

module.exports = authMiddleware;
