const express = require('express');
const { validateTask } = require('../validators/taskValidator');
const repo = require('../db/tasksRepo');
const { TASK_STATUS } = require('../config/constants');

const router = express.Router();

// GET /api/tasks
router.get('/', (req, res) => {
  try {
    const tasks = repo.list(req.query);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = repo.get(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { valid, errors } = validateTask(req.body, false);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  const task = repo.create({
    title: req.body.title,
    description: req.body.description || '',
    subject: req.body.subject,
    type: req.body.type,
    status: req.body.status || 'EN_COURS',
    priority: req.body.priority || 'MOYENNE',
    due_date: req.body.due_date || null
  });
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const { valid, errors } = validateTask(req.body, true);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  const updated = repo.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Task not found' });
  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const removed = repo.remove(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

// PATCH /api/tasks/:id/status
router.patch('/:id/status', (req, res) => {
  const task = repo.get(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  let nextStatus = req.body.status;
  if (!nextStatus) nextStatus = task.status === 'EN_COURS' ? 'TERMINEE' : 'EN_COURS';
  if (!TASK_STATUS.includes(nextStatus)) return res.status(400).json({ message: 'Invalid status' });

  const updated = repo.update(req.params.id, { status: nextStatus });
  res.json(updated);
});

module.exports = router;
