const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_PATH = path.join(__dirname, '..', 'data', 'tasks.json');

function readTasks() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, '[]');
  }
  const raw = fs.readFileSync(DATA_PATH, 'utf-8') || '[]';
  return JSON.parse(raw);
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(tasks, null, 2));
}

function list(filters = {}) {
  let tasks = readTasks();
  const { subject, status, priority, search } = filters;
  if (subject) tasks = tasks.filter((t) => t.subject === subject);
  if (status) tasks = tasks.filter((t) => t.status === status);
  if (priority) tasks = tasks.filter((t) => t.priority === priority);
  if (search) {
    const s = search.toLowerCase();
    tasks = tasks.filter((t) => (t.title + ' ' + (t.description || '')).toLowerCase().includes(s));
  }
  tasks.sort((a, b) => {
    const da = a.due_date ? new Date(a.due_date).getTime() : Infinity;
    const db = b.due_date ? new Date(b.due_date).getTime() : Infinity;
    if (da !== db) return da - db;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
  return tasks;
}

function get(id) {
  return readTasks().find((t) => t.id === id);
}

function create(payload) {
  const now = new Date().toISOString();
  const task = { id: uuidv4(), created_at: now, updated_at: now, ...payload };
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
  return task;
}

function update(id, changes) {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const updated = { ...tasks[idx], ...changes, updated_at: new Date().toISOString() };
  tasks[idx] = updated;
  writeTasks(tasks);
  return updated;
}

function remove(id) {
  const tasks = readTasks();
  const next = tasks.filter((t) => t.id !== id);
  writeTasks(next);
  return next.length !== tasks.length;
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
  DATA_PATH
};
