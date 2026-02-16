import React, { useEffect, useState } from 'react';
import { fetchMe, updateMe } from '../services/auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMe();
        setUser(data);
        setForm((f) => ({ ...f, name: data.name }));
      } catch (err) {
        setError('Impossible de charger le profil');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.name && !form.password) {
      setError('Renseignez au moins un champ');
      return;
    }
    try {
      const updated = await updateMe({ name: form.name, password: form.password || undefined });
      setUser(updated);
      setForm((f) => ({ ...f, password: '' }));
      setSuccess('Profil mis à jour');
    } catch (err) {
      setError(err?.response?.data?.message || 'Échec de la mise à jour');
    }
  };

  if (loading) return <div className="text-slate-600">Chargement...</div>;
  if (error && !user) return <div className="text-rose-600">{error}</div>;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-xl">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Mon profil</h2>
      <div className="text-sm text-slate-500 mb-4">Email : {user?.email}</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-slate-700">Nom</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-700">Nouveau mot de passe (optionnel)</label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-20"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute inset-y-0 right-2 mt-1 text-xs text-brand-600"
            >
              {showPwd ? 'Masquer' : 'Afficher'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">Laissez vide pour conserver l'actuel.</p>
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        {success && <p className="text-sm text-emerald-600">{success}</p>}
        <button type="submit" className="px-4 py-2 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
