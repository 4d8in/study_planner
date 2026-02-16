import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { access_token, refresh_token, user } = await registerRequest(form);
      // réutilise le login context pour stocker les tokens
      localStorage.setItem('mystudyplanner_access', access_token);
      localStorage.setItem('mystudyplanner_refresh', refresh_token);
      localStorage.setItem('mystudyplanner_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Inscription échouée');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Créer un compte</h1>
          <p className="text-sm text-slate-500">Accédez à MyStudyPlanner</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Nom</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-20"
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
          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-50">
            {loading ? 'Création...' : 'Créer le compte'}
          </button>
          <p className="text-xs text-slate-500 text-center">Vous avez déjà un compte ? <button type="button" onClick={() => navigate('/login')} className="text-brand-600">Connexion</button></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
