import React, { useEffect, useMemo, useState } from 'react';
import { fetchTasks, updateStatus, deleteTask, updateTask } from '../services/tasks';
import StatsCards from '../components/StatsCards';
import Filters from '../components/Filters';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ subject: '', status: '', priority: '', search: '' });
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filters);
      setTasks(data);
    } catch (err) {
      setError('Impossible de charger les tâches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    setPage(1); // reset page on filter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.subject, filters.status, filters.priority, filters.search]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const enCours = tasks.filter((t) => t.status === 'EN_COURS').length;
    const terminees = tasks.filter((t) => t.status === 'TERMINEE').length;
    const haute = tasks.filter((t) => t.priority === 'HAUTE').length;
    return { total, enCours, terminees, haute };
  }, [tasks]);

  const subjects = useMemo(() => Array.from(new Set(tasks.map((t) => t.subject))), [tasks]);

  const upcoming = useMemo(() => {
    return tasks
      .filter((t) => t.due_date)
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
      .slice(0, 4);
  }, [tasks]);

  const pagedTasks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, page]);

  const handleToggle = async (task) => {
    await updateStatus(task.id);
    load();
  };

  const handleDelete = async (task) => {
    if (!window.confirm('Supprimer cette tâche ?')) return;
    await deleteTask(task.id);
    load();
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleUpdate = async (payload) => {
    try {
      await updateTask(editTask.id, payload);
      setShowForm(false);
      setEditTask(null);
      load();
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <Filters subjects={subjects} filters={filters} onChange={setFilters} />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      {loading ? (
        <div className="text-center text-slate-600">Chargement...</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3 text-slate-900">Toutes les tâches</h2>
            <TaskTable tasks={pagedTasks} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
            <Pagination page={page} pageSize={pageSize} total={tasks.length} onPageChange={setPage} />
          </div>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">À venir</h3>
              <div className="space-y-3">
                {!upcoming.length && <p className="text-sm text-slate-600">Aucune échéance proche.</p>}
                {upcoming.map((task) => (
                  <div key={task.id} className="border border-slate-100 rounded-lg p-3">
                    <div className="flex justify-between text-sm font-medium text-slate-900">
                      <span>{task.title}</span>
                      <span>{new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-500">{task.subject}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Conseil rapide</h3>
              <p className="text-sm text-slate-600">
                Utilisez les filtres pour isoler vos matières et gardez un œil sur les tâches haute priorité.
              </p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-start sm:items-center justify-center px-4 py-10 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Modifier la tâche</h3>
              <button onClick={() => { setShowForm(false); setEditTask(null); }} className="text-slate-500 hover:text-slate-900">✕</button>
            </div>
            <TaskForm initialData={editTask} onSubmit={handleUpdate} onCancel={() => { setShowForm(false); setEditTask(null); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
