import React from 'react';

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col gap-2">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-2xl font-semibold text-slate-900">{value}</span>
    <span className="text-xs font-semibold text-brand-700">{accent}</span>
  </div>
);

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total" value={stats.total} accent="Toutes les tâches" />
      <StatCard label="En cours" value={stats.enCours} accent="A terminer" />
      <StatCard label="Terminées" value={stats.terminees} accent="Bravo !" />
      <StatCard label="Priorité haute" value={stats.haute} accent="Urgent" />
    </div>
  );
};

export default StatsCards;
