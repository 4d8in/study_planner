import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('student@example.com');
  const [password, setPassword] = useState('changeme123');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl bg-brand-600 text-white flex items-center justify-center font-semibold text-lg">MS</div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">MyStudyPlanner</h1>
            <p className="text-sm text-slate-500">Espace étudiant</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              placeholder="student@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <p className="text-xs text-slate-500 text-center">
            Identifiants démo pré-remplis. Authentification simulée côté serveur.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
