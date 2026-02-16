import React from 'react';
import { statusBadge, statusLabel, priorityBadge, priorityLabel, typeLabel } from '../utils/constants';

// Minimal shadcn-like table styling with Tailwind
const cell = 'px-3 py-2 text-sm text-slate-700 align-middle';
const headerCell = 'px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50 border-b';

const TaskTable = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (!tasks.length) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 text-slate-600 bg-white">Aucune tâche pour ces filtres.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] text-left border-collapse">
        <thead>
          <tr>
            <th className={headerCell}>Titre</th>
            <th className={headerCell}>Matière</th>
            <th className={headerCell}>Type</th>
            <th className={headerCell}>Statut</th>
            <th className={headerCell}>Priorité</th>
            <th className={headerCell}>Échéance</th>
            <th className={headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
              <td className={`${cell} font-semibold text-slate-900`}>{task.title}</td>
              <td className={cell}>{task.subject}</td>
              <td className={cell}><span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{typeLabel[task.type]}</span></td>
              <td className={cell}>
                <span className={`text-xs px-2 py-1 rounded-full ${statusBadge[task.status]}`}>{statusLabel[task.status]}</span>
              </td>
              <td className={cell}>
                <span className={`text-xs px-2 py-1 rounded-full ${priorityBadge[task.priority]}`}>{priorityLabel[task.priority]}</span>
              </td>
              <td className={cell}>{task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}</td>
              <td className={`${cell}`}>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => onToggle(task)} className="text-xs px-2 py-1 rounded border border-slate-200 hover:bg-slate-100">
                  {task.status === 'EN_COURS' ? 'Terminer' : 'Reprendre'}
                  </button>
                  <button onClick={() => onEdit(task)} className="text-xs px-2 py-1 rounded border border-slate-200 hover:bg-slate-100">Éditer</button>
                  <button onClick={() => onDelete(task)} className="text-xs px-2 py-1 rounded border border-rose-200 text-rose-600 hover:bg-rose-50">Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
