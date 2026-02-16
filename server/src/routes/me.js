const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('select id, email, name, role from "User" where id=$1', [req.user.sub]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

router.put('/', async (req, res) => {
  const { name, password } = req.body;
  if (!name && !password) return res.status(400).json({ message: 'Nothing to update' });
  const updates = [];
  const params = [];
  if (name) { params.push(name); updates.push(`name = $${params.length}`); }
  if (password) {
    if (password.length < 6) return res.status(400).json({ message: 'Password too short' });
    const hash = await bcrypt.hash(password, 10);
    params.push(hash);
    updates.push(`password = $${params.length}`);
  }
  params.push(req.user.sub);
  try {
    const { rows } = await pool.query(`update "User" set ${updates.join(', ')} where id=$${params.length} returning id, email, name, role`, params);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
