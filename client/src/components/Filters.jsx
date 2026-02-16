import React from 'react';
import { TASK_PRIORITIES, TASK_STATUS } from '../utils/constants';

const Filters = ({ subjects, filters, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-end md:items-center">
      <div className="flex-1">
        <label className="block text-sm text-slate-600 mb-1">Matière</label>
        <select
          value={filters.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className="w-full md:w-auto rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="">Toutes</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Statut</label>
        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="">Tous</option>
          {TASK_STATUS.map((s) => (
            <option key={s} value={s}>
              {s === 'EN_COURS' ? 'En cours' : 'Terminée'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Priorité</label>
        <select
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="">Toutes</option>
          {TASK_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm text-slate-600 mb-1">Recherche</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          placeholder="Titre ou description"
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </div>
      <button
        onClick={() => onChange({ subject: '', status: '', priority: '', search: '' })}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-100"
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default Filters;
