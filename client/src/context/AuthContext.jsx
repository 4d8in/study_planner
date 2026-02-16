import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, logoutRequest, refreshRequest } from '../services/auth';

const AuthContext = createContext();

const ACCESS_KEY = 'mystudyplanner_access';
const REFRESH_KEY = 'mystudyplanner_refresh';
const USER_KEY = 'mystudyplanner_user';

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(() => localStorage.getItem(ACCESS_KEY));
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
      const { access_token, refresh_token, user: userData } = await loginRequest(username, password);
      setAccess(access_token);
      setUser(userData);
      localStorage.setItem(ACCESS_KEY, access_token);
      localStorage.setItem(REFRESH_KEY, refresh_token);
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
    await logoutRequest(localStorage.getItem(REFRESH_KEY));
    } catch (err) {
      console.warn('Logout error', err);
    }
    setAccess(null);
    setUser(null);
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  };

  useEffect(() => {
    // token refresh simulation not needed
  }, []);

  return (
    <AuthContext.Provider value={{ token: access, user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
