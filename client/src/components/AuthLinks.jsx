import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLinks = () => {
  const navigate = useNavigate();
  return (
    <div className="text-sm text-slate-500 text-center mt-4">
      Pas encore de compte ?{' '}
      <button onClick={() => navigate('/register')} className="text-brand-600 hover:text-brand-700">Créer un compte</button>
    </div>
  );
};

export default AuthLinks;
