import React from 'react';
import { statusBadge, statusLabel, priorityBadge, priorityLabel, typeLabel } from '../utils/constants';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${statusBadge[task.status]}`}>{statusLabel[task.status]}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityBadge[task.priority]}`}>{priorityLabel[task.priority]}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{typeLabel[task.type]}</span>
          </div>
          <p className="text-sm text-slate-600 overflow-hidden text-ellipsis">{task.description}</p>
          <div className="text-xs text-slate-500 flex flex-wrap gap-3">
            <span className="font-medium text-slate-700">{task.subject}</span>
            {task.due_date && <span>Echéance: {new Date(task.due_date).toLocaleDateString()}</span>}
            <span>Maj: {new Date(task.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggle(task)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-100"
          >
            {task.status === 'EN_COURS' ? 'Marquer terminé' : 'Reprendre'}
          </button>
          <button onClick={() => onEdit(task)} className="px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-100">
            Éditer
          </button>
          <button
            onClick={() => onDelete(task)}
            className="px-3 py-2 text-sm rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
