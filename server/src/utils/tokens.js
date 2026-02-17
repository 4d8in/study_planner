const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');

const ACCESS_TTL = env.accessTokenTtl;
const REFRESH_TTL_MS = env.refreshTokenDays * 24 * 60 * 60 * 1000;

function signAccess(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.tokenSecret, { expiresIn: ACCESS_TTL });
}

function generateRefreshToken() {
  return crypto.randomBytes(48).toString('hex');
}

module.exports = {
  ACCESS_TTL,
  REFRESH_TTL_MS,
  signAccess,
  generateRefreshToken
};
