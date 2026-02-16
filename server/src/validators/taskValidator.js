const { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } = require('../config/constants');

function validateTask(body, isUpdate = false) {
  const errors = [];
  const fields = ['title', 'subject', 'type', 'status', 'priority'];
  if (!isUpdate) {
    fields.forEach((field) => {
      if (!body[field]) errors.push(`${field} is required`);
    });
  }

  if (body.title && body.title.length < 3) errors.push('title must be at least 3 characters');
  if (body.type && !TASK_TYPES.includes(body.type)) errors.push('type must be one of ' + TASK_TYPES.join(', '));
  if (body.status && !TASK_STATUS.includes(body.status)) errors.push('status must be one of ' + TASK_STATUS.join(', '));
  if (body.priority && !TASK_PRIORITIES.includes(body.priority)) errors.push('priority must be one of ' + TASK_PRIORITIES.join(', '));
  if (body.due_date && isNaN(Date.parse(body.due_date))) errors.push('due_date must be a valid date');

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validateTask };
