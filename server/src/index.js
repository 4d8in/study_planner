const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const env = require('./config/env');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./middleware/authMiddleware');
const meRoutes = require('./routes/me');

const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/me', authMiddleware(), meRoutes);
app.use('/api/tasks', authMiddleware(), taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const host = process.env.HOST || '127.0.0.1';
app.listen(env.port, host, () => {
  console.log(`API running on http://${host}:${env.port}`);
});
