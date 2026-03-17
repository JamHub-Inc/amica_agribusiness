// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('Amica_token'));
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async (token) => {
    try {
      const data = await authService.getCurrentUser(token);
      setUser(data);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('Amica_token');
      }
      console.error('Failed to load user:', err.message);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      loadUser(accessToken).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [accessToken, loadUser]);

  const register = async (payload) => {
    const data = await authService.register(payload);
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      localStorage.setItem('Amica_token', data.accessToken);
      setUser(data.user);
    }
    return data;
  };

  const login = async (payload) => {
    const data = await authService.login(payload);
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      localStorage.setItem('Amica_token', data.accessToken);
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch { /* silently ignore */ }
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('Amica_token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
