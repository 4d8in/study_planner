const dotenv = require('dotenv');
dotenv.config();

const required = ['DEMO_USER', 'DEMO_PASS', 'TOKEN_SECRET'];
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key} in environment. Check your .env file.`);
  }
});

module.exports = {
  port: process.env.PORT || 5000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  demoUser: process.env.DEMO_USER,
  demoPass: process.env.DEMO_PASS,
  tokenSecret: process.env.TOKEN_SECRET,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
