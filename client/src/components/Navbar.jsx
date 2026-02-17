import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="container-responsive flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-semibold">MS</div>
          <span className="font-semibold text-slate-900 text-base sm:text-lg">MyStudyPlanner</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className={linkClass}>
            Tâches
          </NavLink>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-slate-800">{user?.name || 'Étudiant'}</span>
            <span className="text-xs text-slate-500">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
