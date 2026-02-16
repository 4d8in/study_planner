const express = require('express');
const env = require('../config/env');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  if (username === env.demoUser && password === env.demoPass) {
    return res.json({
      token: env.tokenSecret,
      user: { email: env.demoUser, name: 'Demo Student' }
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/logout', (_req, res) => {
  return res.json({ message: 'Logged out' });
});

module.exports = router;
