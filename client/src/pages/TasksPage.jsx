import React, { useEffect, useMemo, useState } from 'react';
import { createTask, deleteTask, fetchTasks, updateStatus, updateTask } from '../services/tasks';
import Filters from '../components/Filters';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ subject: '', status: '', priority: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const subjects = useMemo(() => Array.from(new Set(tasks.map((t) => t.subject))), [tasks]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filters);
      setTasks(data);
    } catch (err) {
      setError('Chargement impossible');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.subject, filters.status, filters.priority, filters.search]);

  const handleCreate = async (payload) => {
    try {
      await createTask(payload);
      setShowForm(false);
      load();
    } catch (err) {
      alert('Erreur lors de la création');
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await updateTask(editTask.id, payload);
      setEditTask(null);
      setShowForm(false);
      load();
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (task) => {
    if (!confirm('Supprimer cette tâche ?')) return;
    await deleteTask(task.id);
    load();
  };

  const handleToggle = async (task) => {
    await updateStatus(task.id);
    load();
  };

  const onSubmit = (payload) => {
    if (editTask) {
      handleUpdate(payload);
    } else {
      handleCreate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Filters subjects={subjects} filters={filters} onChange={setFilters} />
        <button
          onClick={() => {
            setEditTask(null);
            setShowForm(true);
          }}
          className="self-start sm:self-auto px-4 py-2 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700"
        >
          + Nouvelle tâche
        </button>
      </div>

      {loading ? (
        <p className="text-center text-slate-600">Chargement...</p>
      ) : (
        <TaskList tasks={tasks} onEdit={(t) => { setEditTask(t); setShowForm(true); }} onDelete={handleDelete} onToggle={handleToggle} />
      )}

      {error && <p className="text-sm text-rose-600">{error}</p>}

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-start sm:items-center justify-center px-4 py-10 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{editTask ? 'Modifier la tâche' : 'Créer une tâche'}</h3>
              <button onClick={() => { setShowForm(false); setEditTask(null); }} className="text-slate-500 hover:text-slate-900">✕</button>
            </div>
            <TaskForm initialData={editTask} onSubmit={onSubmit} onCancel={() => { setShowForm(false); setEditTask(null); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
