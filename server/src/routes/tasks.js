const express = require('express');
const { validateTask } = require('../validators/taskValidator');
const pool = require('../db/pool');
const { TASK_STATUS } = require('../config/constants');

const router = express.Router();

// table "tasks" as définie dans schema.sql (due_date, created_at, updated_at)
const baseSelect = `select t.id, t.title, t.description, t.subject, t.type, t.status, t.priority,
  t.due_date, t.created_at, t.updated_at
from tasks t`;

router.get('/', async (req, res) => {
  const { subject, status, priority, search } = req.query;
  const clauses = [];
  const params = [];
  if (subject) { params.push(subject); clauses.push(`t.subject = $${params.length}`); }
  if (status) { params.push(status); clauses.push(`t.status = $${params.length}`); }
  if (priority) { params.push(priority); clauses.push(`t.priority = $${params.length}`); }
  if (search) {
    params.push(`%${search}%`);
    clauses.push(`(t.title ilike $${params.length} or t.description ilike $${params.length})`);
  }
  const where = clauses.length ? `where ${clauses.join(' and ')}` : '';
  try {
    const { rows } = await pool.query(`${baseSelect} ${where} order by t.due_date asc nulls last, t.created_at asc`, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

router.get('/:id', async (req, res) => {
    const { rows } = await pool.query(`${baseSelect} where t.id=$1`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { valid, errors } = validateTask(req.body, false);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });
  const { title, description, subject, type, status, priority, due_date } = req.body;
  try {
    const { rows } = await pool.query(
      `insert into tasks (id, title, description, subject, type, status, priority, due_date, created_at, updated_at)
       values (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, now(), now())
       returning *`,
      [title, description || '', subject, type, status || 'EN_COURS', priority || 'MOYENNE', due_date ? new Date(due_date) : null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

router.put('/:id', async (req, res) => {
  const { valid, errors } = validateTask(req.body, true);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });
  const { title, description, subject, type, status, priority, due_date } = req.body;
  try {
    const { rows: upd } = await pool.query(
      `update tasks
       set title=$1, description=$2, subject=$3, type=$4, status=$5, priority=$6, due_date=$7, updated_at=now()
       where id=$8
       returning *`,
      [title, description || '', subject, type, status || 'EN_COURS', priority || 'MOYENNE', due_date ? new Date(due_date) : null, req.params.id]
    );
    res.json(upd[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('delete from tasks where id=$1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { rows } = await pool.query('select status from tasks where id=$1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });
    const task = rows[0];
    let nextStatus = req.body.status || (task.status === 'EN_COURS' ? 'TERMINEE' : 'EN_COURS');
    if (!TASK_STATUS.includes(nextStatus)) return res.status(400).json({ message: 'Invalid status' });
    const { rows: upd } = await pool.query('update tasks set status=$1, updated_at=now() where id=$2 returning *', [nextStatus, req.params.id]);
    res.json(upd[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
