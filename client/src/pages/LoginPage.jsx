import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLinks from '../components/AuthLinks';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
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
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-20 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute inset-y-0 right-2 mt-1 text-xs text-brand-600"
                aria-label="Afficher ou masquer le mot de passe"
              >
                {showPwd ? 'Masquer' : 'Afficher'}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <AuthLinks />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
