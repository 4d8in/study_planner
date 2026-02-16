const prisma = require('../db/prismaClient');

async function ensureOwner(req, res, next) {
  const id = req.params.id;
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.userId !== req.user.sub && req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}

module.exports = ensureOwner;
