import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, logoutRequest } from '../services/auth';

const AuthContext = createContext();

const TOKEN_KEY = 'mystudyplanner_token';
const USER_KEY = 'mystudyplanner_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const { token: newToken, user: userData } = await loginRequest(username, password);
      setToken(newToken);
      setUser(userData);
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      return true;
    } catch (err) {
      setError(err?.response?.data?.message || 'Erreur de connexion');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.warn('Logout error', err);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  useEffect(() => {
    // token refresh simulation not needed
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
