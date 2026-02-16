import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const title = location.pathname.includes('tasks') ? 'Mes tâches' : 'Tableau de bord';
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container-responsive py-6">
        <header className="mb-6 flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">Planifiez vos devoirs, TP et projets par matière.</p>
          <Link to="/profile" className="text-sm text-brand-600 hover:text-brand-700">Mon profil</Link>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
