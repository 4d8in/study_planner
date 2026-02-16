import React, { useEffect, useMemo, useState } from 'react';
import { fetchTasks, updateStatus } from '../services/tasks';
import StatsCards from '../components/StatsCards';
import Filters from '../components/Filters';
import TaskList from '../components/TaskList';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ subject: '', status: '', priority: '', search: '' });
  const [error, setError] = useState(null);

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

  const handleToggle = async (task) => {
    await updateStatus(task.id);
    load();
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
            <TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} onToggle={handleToggle} />
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
    </div>
  );
};

export default DashboardPage;
