// src/services/authService.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('Amica_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers,
    credentials: 'include',
    ...options,
  });
  
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = res.status;
    throw error;
  }
  return data;
}

export const authService = {
  register: (payload) =>
    request('/users/register', { method: 'POST', body: JSON.stringify(payload) }),

  login: (payload) =>
    request('/users/login', { method: 'POST', body: JSON.stringify(payload) }),

  logout: () =>
    request('/users/logout', { method: 'POST' }),

  refreshToken: () =>
    request('/users/refresh-token', { method: 'POST' }),

  getCurrentUser: (token) =>
    request('/users/me', { headers: { Authorization: `Bearer ${token}` } }),

  verifyEmail: (payload) =>
    request('/users/verify-email', { method: 'POST', body: JSON.stringify(payload) }),

  resendVerification: (payload) =>
    request('/users/resend-verification', { method: 'POST', body: JSON.stringify(payload) }),

  requestPasswordReset: (payload) =>
    request('/users/password/request-reset', { method: 'POST', body: JSON.stringify(payload) }),

  resetPassword: (payload) =>
    request('/users/password/reset', { method: 'POST', body: JSON.stringify(payload) }),

  joinSacco: (saccoId) =>
    request('/users/join-sacco', { method: 'POST', body: JSON.stringify({ saccoId }) }),
};
