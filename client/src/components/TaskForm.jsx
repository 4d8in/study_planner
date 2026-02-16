import React, { useEffect, useState } from 'react';
import { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } from '../utils/constants';

const emptyTask = {
  title: '',
  description: '',
  subject: '',
  type: 'DEVOIR',
  status: 'EN_COURS',
  priority: 'MOYENNE',
  due_date: ''
};

const TaskForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        due_date: initialData.due_date ? initialData.due_date.slice(0, 10) : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Titre *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Ex: TP réseaux"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Matière *</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Réseaux"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2">
            {TASK_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Statut</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2">
            {TASK_STATUS.map((s) => (
              <option key={s} value={s}>
                {s === 'EN_COURS' ? 'En cours' : 'Terminée'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Priorité</label>
          <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2">
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Date limite</label>
        <input
          type="date"
          name="due_date"
          value={form.due_date || ''}
          onChange={handleChange}
          className="w-full md:w-1/2 rounded-lg border border-slate-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Détails, livrables, liens..."
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
          Annuler
        </button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700">
          {initialData ? 'Mettre à jour' : 'Créer la tâche'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
