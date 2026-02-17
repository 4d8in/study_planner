const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const { generateRefreshToken, REFRESH_TTL_MS, signAccess } = require('../utils/tokens');

const router = express.Router();

async function createRefresh(userId) {
  const refresh = generateRefreshToken();
  const expires = new Date(Date.now() + REFRESH_TTL_MS);
  await pool.query(
    'insert into "RefreshToken" ("id", "token", "userId", "expiresAt") values (gen_random_uuid(), $1, $2, $3)',
    [refresh, userId, expires]
  );
  return refresh;
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  try {
    const { rows } = await pool.query('select id, email, password, name, role from "User" where email=$1', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const access = signAccess(user);
    const refresh = await createRefresh(user.id);

    res.json({ access_token: access, refresh_token: refresh, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(400).json({ message: 'refresh_token required' });
  try {
    const { rows } = await pool.query(
      'select rt."token", rt."expiresAt", u.id, u.email, u.role, u.name from "RefreshToken" rt join "User" u on u.id=rt."userId" where rt."token"=$1',
      [refresh_token]
    );
    if (!rows.length || new Date(rows[0].expiresAt) < new Date()) return res.status(401).json({ message: 'Invalid refresh token' });
    const user = rows[0];
    const access = signAccess(user);
    res.json({ access_token: access });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Refresh failed' });
  }
});

router.post('/logout', async (req, res) => {
  const { refresh_token } = req.body;
  if (refresh_token) {
    await pool.query('delete from "RefreshToken" where token=$1', [refresh_token]);
  }
  res.json({ message: 'Logged out' });
});

router.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: 'email, password, name required' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'insert into "User" (id, email, password, name, role) values (gen_random_uuid(), $1, $2, $3, $4) returning id, email, name, role',
      [email, hash, name, role || 'STUDENT']
    );
    const user = rows[0];
    const access = signAccess(user);
    const refresh = await createRefresh(user.id);
    res.status(201).json({ access_token: access, refresh_token: refresh, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
