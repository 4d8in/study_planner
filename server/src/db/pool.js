const { Pool } = require('pg');
const env = require('../config/env');

const pool = new Pool({
  connectionString: env.databaseUrl || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
