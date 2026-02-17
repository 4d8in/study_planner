const dotenv = require('dotenv');
dotenv.config();

const required = ['TOKEN_SECRET', 'DATABASE_URL'];
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key} in environment. Check your .env file.`);
  }
});

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
  refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS || 7)
};
