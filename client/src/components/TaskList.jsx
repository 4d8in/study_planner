import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (!tasks.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-600">
        Aucune tâche pour ces filtres.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default TaskList;
